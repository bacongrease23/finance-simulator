// ============================================================
// METROPOLIS — Firebase Firestore Schema & Data Layer
// firebase-schema.js
//
// This file defines:
//   1. All Firestore collection structures (as JS objects / comments)
//   2. The FirestoreDB class — the single source of truth for all
//      reads and writes in the game. Import this everywhere.
//   3. Seed helpers to populate the DB on first admin setup.
//
// Firestore collections:
//   /players/{uid}                    — one doc per student
//   /players/{uid}/emails/{emailId}   — inbox subcollection
//   /players/{uid}/todos/{todoId}     — to-do list subcollection
//   /players/{uid}/transactions/{txId}— bank statement subcollection
//   /jobs/{jobId}                     — job board pool (500 entries)
//   /apartments/{aptId}               — housing listings
//   /admin/events                     — pending admin-triggered events
//   /admin/requests                   — student requests awaiting approval
//   /admin/config                     — global game settings
//   /groceries/{itemId}               — grocery store inventory + prices
// ============================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import {
  getFirestore,
  doc, getDoc, setDoc, updateDoc, deleteDoc,
  collection, addDoc, getDocs, query, where, orderBy, limit,
  onSnapshot, serverTimestamp, increment, writeBatch,
  Timestamp
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

const FIREBASE_CONFIG = {
  apiKey:            "AIzaSyCZiswJWqUZ-GSjBjJxqfNtkFtWO3J5LzU",
  authDomain:        "finance-simulator-c0072.firebaseapp.com",
  projectId:         "finance-simulator-c0072",
  storageBucket:     "finance-simulator-c0072.firebasestorage.app",
  messagingSenderId: "300198924512",
  appId:             "1:300198924512:web:09b50c88175f65cbe74085"
};

const app = initializeApp(FIREBASE_CONFIG);
const db  = getFirestore(app);

// ============================================================
// SCHEMA REFERENCE  (these are the shapes of every document)
// ============================================================

/*
── /players/{uid} ──────────────────────────────────────────
{
  // Identity
  uid:           string,      // "tsullivan"  (first-initial + last-name, lowercase)
  firstName:     string,      // "Thomas"
  lastName:      string,      // "Sullivan"
  createdAt:     Timestamp,
  lastLogin:     Timestamp,

  // Onboarding progress
  onboardingStep: string,     // "character" | "degree" | "finals" | "tutorial" | "jobboard" | "housing" | "complete"

  // Character
  characterId:   string,      // matches characters.json
  characterName: string,

  // Education
  majorId:       string,      // matches MAJORS in content.js
  majorLabel:    string,
  graduationGPA: number,      // 2.0–4.0, set after finals

  // Employment
  jobId:         string | null,
  jobTitle:      string | null,
  employer:      string | null,
  annualSalary:  number,      // 0 until employed
  benefits: {
    health:      boolean,
    retirement401k: boolean,  // e.g. 3% match
    retirementPct:  number,
    gymStipend:  boolean,
    gymAmount:   number,      // monthly $
    housing:     boolean,     // ultra-rare employer housing
    housingAddress: string | null,
    housingRent: number,      // heavily subsidised amount
    other:       string[],
  },
  payFrequency:  string,      // "biweekly" | "monthly"
  nextPayDate:   number,      // game-day number

  // Housing
  apartmentId:   string | null,
  apartmentName: string | null,
  apartmentUnit: string | null,
  address:       string | null,
  monthlyRent:   number,
  rentPolicyId:  string,      // which late-fee policy
  homeCustomization: number,  // 0–11 index into the 12 home images

  // Finances
  checkingBalance:  number,
  savingsBalance:   number,
  creditScore:      number,   // 300–850
  totalDebt:        number,
  monthlyDebt:      number,   // minimum payment sum

  // Game time
  gameDay:       number,      // current in-game day (starts mid-month, e.g. 15)
  gameMonth:     number,      // 1–12
  gameYear:      number,      // starts at 1

  // Meters
  groceryMeter:  number,      // 0–100 (100 = fully stocked)

  // Admin flags
  isFrozen:      boolean,     // admin can freeze an account
  hasFraudCharge: boolean,
  fraudAmount:   number,
  fraudMerchant: string,

  // Misc
  notes:         string,      // teacher private notes on this student
}

── /players/{uid}/emails/{emailId} ─────────────────────────
{
  emailId:    string,         // auto-generated
  from:       string,         // "Siena Credit Union"
  fromEmail:  string,         // "noreply@sienacreditunion.com"
  subject:    string,
  body:       string,         // plain text, supports \n
  isRead:     boolean,
  isStarred:  boolean,
  receivedAt: Timestamp,      // when it appears in inbox (next login)
  templateId: string,         // which EMAIL_TEMPLATE was used
  actionRequired: boolean,    // shows badge in inbox
  actionType: string | null,  // "fraud_report" | "loan_response" | "eviction" | null
}

── /players/{uid}/todos/{todoId} ────────────────────────────
{
  todoId:      string,
  text:        string,        // "Pay rent — due Day 1"
  isComplete:  boolean,
  completedAt: Timestamp | null,
  addedAt:     Timestamp,
  source:      string,        // "player" | "system" | "event"
  priority:    string,        // "high" | "normal" | "low"
}

── /players/{uid}/transactions/{txId} ──────────────────────
{
  txId:        string,
  date:        string,        // "Month 2, Day 14" (game date string)
  gameDay:     number,
  merchant:    string,
  description: string,
  amount:      number,        // negative = debit, positive = credit
  balance:     number,        // running balance after this tx
  category:    string,        // "income" | "rent" | "groceries" | "utilities" | "loan" | "fraud" | "fee" | "other"
  isFraud:     boolean,
  isPending:   boolean,
}

── /jobs/{jobId} ────────────────────────────────────────────
{
  jobId:       string,
  title:       string,        // "Junior Financial Analyst"
  employer:    string,        // "Merriweather Capital Group"
  industry:    string,        // matches majorId categories
  level:       string,        // always "entry" for the job board
  location:    string,        // "McLean, VA" | "Arlington, VA" | etc.
  annualSalary: number,
  benefits: {
    health:    boolean,
    healthPlan: string,       // "HMO" | "PPO" | "HDHP" | null
    retirement401k: boolean,
    retirementPct:  number,   // 0, 2, 3, 4, 5, 6
    gymStipend: boolean,
    gymAmount:  number,
    paidTimeOff: number,      // days per year: 0, 5, 10, 15, 20
    remotePolicy: string,     // "in-office" | "hybrid" | "remote"
    housing:    boolean,      // ULTRA RARE — only 2-3 jobs
    housingAddress: string | null,
    housingRent: number,
    signingBonus: number,
    tuitionReimbursement: boolean,
    other:      string[],
  },
  payFrequency: string,       // "biweekly" | "monthly"
  description:  string,       // 1–2 sentence job blurb
  majorMatch:   string[],     // which majorIds this job is relevant for
  isAvailable:  boolean,      // false once a student claims it
  claimedBy:    string | null,
}

── /apartments/{aptId} ──────────────────────────────────────
{
  aptId:        string,
  buildingName: string,       // "Meridian Heights"
  buildingId:   string,       // maps to city map building hotspot
  unit:         string,       // "2B", "4A", etc.
  address:      string,       // "1240 Meridian Ave, Arlington, VA"
  monthlyRent:  number,       // Fairfax County realistic range
  bedrooms:     number,       // 0 (studio) | 1 | 2
  bathrooms:    number,
  sqft:         number,
  amenities:    string[],     // ["Gym", "Parking", "Rooftop", ...]
  petFriendly:  boolean,
  rentPolicyId: string,       // which late-fee policy applies
  securityDeposit: number,    // usually 1 month rent
  isAvailable:  boolean,
  tenantUid:    string | null,
  photos:       string[],     // image asset paths (future)
  description:  string,
}

── /admin/events (single doc, array field) ──────────────────
{
  queue: [
    {
      eventId:    string,
      targetUid:  string,
      type:       string,     // "eviction_warning" | "fraud_charge" | "fired" | "bonus" | "promotion" | "raise" | "emergency" | "custom_email"
      payload:    object,     // event-specific data
      createdAt:  Timestamp,
      deliveredAt: Timestamp | null,
      isDelivered: boolean,
    }
  ]
}

── /admin/requests (subcollection per request) ──────────────
{
  requestId:    string,
  fromUid:      string,
  fromName:     string,
  type:         string,       // "loan" | "fraud_dispute" | "rent_extension" | "credit_card" | "mortgage" | "custom"
  subject:      string,
  body:         string,
  amount:       number | null,
  status:       string,       // "pending" | "approved" | "denied"
  adminNote:    string,
  createdAt:    Timestamp,
  resolvedAt:   Timestamp | null,
  responseEmailSent: boolean,
}

── /admin/config (single doc) ───────────────────────────────
{
  gameActive:   boolean,
  adminUsername: string,
  adminPassword: string,      // hashed ideally — for v1 plaintext is ok
  classStartDay: number,      // players start on game day X
  currentSeason: string,      // "Spring 2026"
  totalStudents: number,
  lastUpdated:  Timestamp,
}

── /groceries/{itemId} ──────────────────────────────────────
{
  itemId:       string,
  name:         string,       // "Whole Milk (1 gallon)"
  category:     string,       // "dairy" | "produce" | "meat" | "bakery" | "frozen" | "beverages" | "snacks" | "household"
  price:        number,       // Fairfax County Safeway/Giant avg
  unit:         string,       // "each" | "lb" | "oz" | "pack"
  groceryValue: number,       // how much meter this fills (1–15)
  imageKey:     string,       // future emoji or asset key
}
*/

// ============================================================
// FirestoreDB  — the game's data access layer
// ============================================================

export class FirestoreDB {

  // ── Players ─────────────────────────────────────────────

  static async getPlayer(uid) {
    const snap = await getDoc(doc(db, "players", uid));
    return snap.exists() ? { ...snap.data(), uid } : null;
  }

  static async createPlayer(uid, firstName, lastName) {
    const startDay   = 15; // players begin mid-month
    const playerData = {
      uid, firstName, lastName,
      createdAt:       serverTimestamp(),
      lastLogin:       serverTimestamp(),
      onboardingStep:  "character",
      characterId:     null,
      characterName:   null,
      majorId:         null,
      majorLabel:      null,
      graduationGPA:   null,
      jobId:           null,
      jobTitle:        null,
      employer:        null,
      annualSalary:    0,
      benefits: {
        health: false, retirement401k: false, retirementPct: 0,
        gymStipend: false, gymAmount: 0, housing: false,
        housingAddress: null, housingRent: 0, other: []
      },
      payFrequency:    "biweekly",
      nextPayDate:     startDay + 14,
      apartmentId:     null,
      apartmentName:   null,
      apartmentUnit:   null,
      address:         null,
      monthlyRent:     0,
      rentPolicyId:    null,
      homeCustomization: 0,
      checkingBalance: 500,   // small starter buffer
      savingsBalance:  0,
      creditScore:     650,
      totalDebt:       0,
      monthlyDebt:     0,
      gameDay:         startDay,
      gameMonth:       1,
      gameYear:        1,
      groceryMeter:    100,
      isFrozen:        false,
      hasFraudCharge:  false,
      fraudAmount:     0,
      fraudMerchant:   "",
      notes:           "",
    };
    await setDoc(doc(db, "players", uid), playerData);
    // Send welcome email at next login
    await FirestoreDB.queueEmail(uid, "welcome", {});
    return playerData;
  }

  static async updatePlayer(uid, fields) {
    await updateDoc(doc(db, "players", uid), fields);
  }

  static async getAllPlayers() {
    const snap = await getDocs(collection(db, "players"));
    return snap.docs.map(d => ({ ...d.data(), uid: d.id }));
  }

  static listenToPlayer(uid, callback) {
    return onSnapshot(doc(db, "players", uid), snap => {
      if (snap.exists()) callback({ ...snap.data(), uid });
    });
  }

  // ── Game Time ────────────────────────────────────────────

  // Call on logout: advance time by 1–8 random days, trigger consequences
  static async advanceTime(uid) {
    const player = await FirestoreDB.getPlayer(uid);
    if (!player) return;

    // Cryptographically-seeded random feels more truly random than Math.random()
    const daysToAdvance = Math.floor(Math.random() * 8) + 1;

    let { gameDay, gameMonth, gameYear, checkingBalance, monthlyRent,
          rentPolicyId, groceryMeter, annualSalary, payFrequency, nextPayDate } = player;

    const events = []; // events to queue as emails/notifications

    for (let i = 0; i < daysToAdvance; i++) {
      gameDay++;

      // Month rollover
      if (gameDay > 30) {
        gameDay = 1;
        gameMonth++;
        if (gameMonth > 12) { gameMonth = 1; gameYear++; }
      }

      // Rent due on Day 1
      if (gameDay === 1 && monthlyRent > 0) {
        events.push({ type: "rent_due", month: gameMonth, year: gameYear });
      }

      // Paycheck
      if (annualSalary > 0 && gameDay === nextPayDate) {
        const payAmount = payFrequency === "biweekly"
          ? annualSalary / 26
          : annualSalary / 12;
        const net = payAmount * 0.72; // rough 28% tax withholding
        checkingBalance += net;
        nextPayDate += payFrequency === "biweekly" ? 14 : 30;
        await FirestoreDB.addTransaction(uid, {
          merchant:    player.employer || "Employer",
          description: `${payFrequency === "biweekly" ? "Biweekly" : "Monthly"} paycheck`,
          amount:      net,
          category:    "income",
          gameDay, month: gameMonth, year: gameYear
        }, checkingBalance);
      }

      // Grocery meter drains: lose ~3–6 pts per day
      const drainRate = 3 + Math.floor(Math.random() * 4);
      groceryMeter = Math.max(0, groceryMeter - drainRate);
    }

    // Queue emails for events that happened
    for (const event of events) {
      if (event.type === "rent_due") {
        await FirestoreDB.queueEmail(uid, "rent_reminder", {
          month: event.month, dueDate: `Month ${event.month}, Day 1`
        });
      }
    }

    await FirestoreDB.updatePlayer(uid, {
      gameDay, gameMonth, gameYear,
      checkingBalance, groceryMeter, nextPayDate,
      lastLogin: serverTimestamp(),
    });

    // Deliver any pending admin events for this player
    await FirestoreDB.deliverPendingEvents(uid);

    return { gameDay, gameMonth, gameYear, daysAdvanced: daysToAdvance };
  }

  // ── Email ────────────────────────────────────────────────

  // Build and queue an email from a template
  static async queueEmail(uid, templateId, vars) {
    const player   = await FirestoreDB.getPlayer(uid);
    const template = EMAIL_TEMPLATES[templateId];
    if (!template) { console.warn(`Unknown template: ${templateId}`); return; }

    const fullName = `${player.firstName} ${player.lastName}`;
    const fill = (str) => str
      .replace(/\{name\}/g,      fullName)
      .replace(/\{firstName\}/g, player.firstName)
      .replace(/\{lastName\}/g,  player.lastName)
      .replace(/\{amount\}/g,    vars.amount   ? `$${Number(vars.amount).toFixed(2)}`  : "")
      .replace(/\{month\}/g,     vars.month    ? `Month ${vars.month}`                 : "")
      .replace(/\{dueDate\}/g,   vars.dueDate  || "")
      .replace(/\{merchant\}/g,  vars.merchant || "")
      .replace(/\{address\}/g,   vars.address  || "")
      .replace(/\{reason\}/g,    vars.reason   || "")
      .replace(/\{balance\}/g,   vars.balance  ? `$${Number(vars.balance).toFixed(2)}` : "")
      .replace(/\{note\}/g,      vars.note     || "");

    const emailDoc = {
      from:        template.from,
      fromEmail:   template.fromEmail,
      subject:     fill(template.subject),
      body:        fill(template.body),
      isRead:      false,
      isStarred:   false,
      receivedAt:  serverTimestamp(),
      templateId,
      actionRequired: template.actionRequired || false,
      actionType:     template.actionType     || null,
    };
    await addDoc(collection(db, "players", uid, "emails"), emailDoc);
  }

  static async getEmails(uid) {
    const snap = await getDocs(
      query(collection(db, "players", uid, "emails"),
            orderBy("receivedAt", "desc"))
    );
    return snap.docs.map(d => ({ ...d.data(), emailId: d.id }));
  }

  static async markEmailRead(uid, emailId) {
    await updateDoc(doc(db, "players", uid, "emails", emailId), { isRead: true });
  }

  static listenToEmails(uid, callback) {
    return onSnapshot(
      query(collection(db, "players", uid, "emails"), orderBy("receivedAt", "desc")),
      snap => callback(snap.docs.map(d => ({ ...d.data(), emailId: d.id })))
    );
  }

  // ── To-Do List ───────────────────────────────────────────

  static async addTodo(uid, text, { source = "player", priority = "normal" } = {}) {
    await addDoc(collection(db, "players", uid, "todos"), {
      text, isComplete: false, completedAt: null,
      addedAt: serverTimestamp(), source, priority,
    });
  }

  static async completeTodo(uid, todoId) {
    // Players must manually cross it off — not auto-removed
    await updateDoc(doc(db, "players", uid, "todos", todoId), {
      isComplete: true, completedAt: serverTimestamp()
    });
  }

  static async getTodos(uid) {
    const snap = await getDocs(
      query(collection(db, "players", uid, "todos"), orderBy("addedAt", "desc"))
    );
    return snap.docs.map(d => ({ ...d.data(), todoId: d.id }));
  }

  static listenToTodos(uid, callback) {
    return onSnapshot(
      query(collection(db, "players", uid, "todos"), orderBy("addedAt", "asc")),
      snap => callback(snap.docs.map(d => ({ ...d.data(), todoId: d.id })))
    );
  }

  // ── Bank Transactions ────────────────────────────────────

  static async addTransaction(uid, { merchant, description, amount, category,
                                     gameDay, month, year, isFraud = false }, newBalance) {
    const dateStr = `Month ${month}, Day ${gameDay}`;
    await addDoc(collection(db, "players", uid, "transactions"), {
      date: dateStr, gameDay, merchant, description,
      amount, balance: newBalance, category,
      isFraud, isPending: false,
    });
  }

  static async getTransactions(uid, limitCount = 50) {
    const snap = await getDocs(
      query(collection(db, "players", uid, "transactions"),
            orderBy("gameDay", "desc"), limit(limitCount))
    );
    return snap.docs.map(d => ({ ...d.data(), txId: d.id }));
  }

  // ── Rent & Housing ───────────────────────────────────────

  static async payRent(uid) {
    const player = await FirestoreDB.getPlayer(uid);
    const { checkingBalance, monthlyRent, rentPolicyId, gameDay, gameMonth, gameYear } = player;

    if (checkingBalance < monthlyRent) {
      // Insufficient funds — flag but allow (bank overdraft scenario)
      await FirestoreDB.updatePlayer(uid, { checkingBalance: checkingBalance - monthlyRent });
      await FirestoreDB.queueEmail(uid, "rent_nsf", { amount: monthlyRent });
      return { success: false, reason: "nsf" };
    }

    const newBal = checkingBalance - monthlyRent;
    await FirestoreDB.updatePlayer(uid, { checkingBalance: newBal });
    await FirestoreDB.addTransaction(uid, {
      merchant:    player.apartmentName || "Landlord",
      description: `Rent payment — Month ${gameMonth}`,
      amount:      -monthlyRent, category: "rent",
      gameDay, month: gameMonth, year: gameYear
    }, newBal);

    return { success: true };
  }

  static async claimApartment(uid, aptId) {
    const [player, apt] = await Promise.all([
      FirestoreDB.getPlayer(uid),
      getDoc(doc(db, "apartments", aptId))
    ]);
    const aptData = apt.data();
    if (!aptData.isAvailable) return { success: false, reason: "unavailable" };

    const deposit = aptData.securityDeposit;
    if (player.checkingBalance < deposit) return { success: false, reason: "cant_afford_deposit" };

    const newBal = player.checkingBalance - deposit;
    const batch  = writeBatch(db);
    batch.update(doc(db, "players", uid), {
      apartmentId:   aptId,
      apartmentName: aptData.buildingName,
      apartmentUnit: aptData.unit,
      address:       aptData.address,
      monthlyRent:   aptData.monthlyRent,
      rentPolicyId:  aptData.rentPolicyId,
      checkingBalance: newBal,
    });
    batch.update(doc(db, "apartments", aptId), { isAvailable: false, tenantUid: uid });
    await batch.commit();

    await FirestoreDB.addTransaction(uid, {
      merchant:    aptData.buildingName,
      description: `Security deposit — Unit ${aptData.unit}`,
      amount:      -deposit, category: "rent",
      gameDay: player.gameDay, month: player.gameMonth, year: player.gameYear
    }, newBal);

    await FirestoreDB.queueEmail(uid, "lease_signed", {
      address: aptData.address, amount: aptData.monthlyRent
    });

    return { success: true };
  }

  // ── Jobs ─────────────────────────────────────────────────

  static async getAvailableJobs(majorId, count = 30) {
    // Return a random sample of available jobs relevant to the player's major
    const snap = await getDocs(
      query(collection(db, "jobs"),
            where("isAvailable", "==", true),
            where("majorMatch", "array-contains", majorId),
            limit(count))
    );
    const relevant = snap.docs.map(d => ({ ...d.data(), jobId: d.id }));

    // Supplement with general jobs if under count
    if (relevant.length < 15) {
      const snap2 = await getDocs(
        query(collection(db, "jobs"),
              where("isAvailable", "==", true),
              where("majorMatch", "array-contains", "all"),
              limit(count - relevant.length))
      );
      relevant.push(...snap2.docs.map(d => ({ ...d.data(), jobId: d.id })));
    }
    return relevant;
  }

  static async acceptJob(uid, jobId) {
    const [player, jobSnap] = await Promise.all([
      FirestoreDB.getPlayer(uid),
      getDoc(doc(db, "jobs", jobId))
    ]);
    const job = jobSnap.data();
    if (!job.isAvailable) return { success: false, reason: "taken" };

    const batch = writeBatch(db);
    batch.update(doc(db, "players", uid), {
      jobId, jobTitle: job.title, employer: job.employer,
      annualSalary: job.annualSalary, benefits: job.benefits,
      payFrequency: job.payFrequency,
      nextPayDate:  player.gameDay + (job.payFrequency === "biweekly" ? 14 : 30),
      onboardingStep: player.onboardingStep === "jobboard" ? "housing" : player.onboardingStep,
    });
    batch.update(doc(db, "jobs", jobId), { isAvailable: false, claimedBy: uid });
    await batch.commit();

    await FirestoreDB.queueEmail(uid, "job_offer_accepted", {
      note: `${job.title} at ${job.employer} — $${job.annualSalary.toLocaleString()}/yr`
    });

    return { success: true, job };
  }

  // ── Groceries ────────────────────────────────────────────

  static async purchaseGroceries(uid, items) {
    // items: [{ itemId, name, price, qty, groceryValue }]
    const player = await FirestoreDB.getPlayer(uid);
    const total  = items.reduce((s, i) => s + i.price * i.qty, 0);

    if (player.checkingBalance < total) return { success: false, reason: "nsf" };

    const meterGain = Math.min(100,
      items.reduce((s, i) => s + i.groceryValue * i.qty, 0)
    );
    const newBal   = player.checkingBalance - total;
    const newMeter = Math.min(100, player.groceryMeter + meterGain);

    await FirestoreDB.updatePlayer(uid, {
      checkingBalance: newBal, groceryMeter: newMeter
    });
    await FirestoreDB.addTransaction(uid, {
      merchant:    "Metro Fresh Market",
      description: `Grocery run — ${items.length} item(s)`,
      amount:      -total, category: "groceries",
      gameDay: player.gameDay, month: player.gameMonth, year: player.gameYear
    }, newBal);

    return { success: true, total, newBalance: newBal, newMeter };
  }

  // ── Admin — Event Queue ──────────────────────────────────

  // Teacher triggers an event; it queues and delivers at next player login
  static async adminTriggerEvent(targetUid, type, payload = {}) {
    const eventRef = doc(db, "admin", "events");
    const existing = await getDoc(eventRef);
    const queue    = existing.exists() ? (existing.data().queue || []) : [];

    queue.push({
      eventId:     crypto.randomUUID(),
      targetUid, type, payload,
      createdAt:   new Date().toISOString(),
      deliveredAt: null,
      isDelivered: false,
    });

    await setDoc(eventRef, { queue }, { merge: true });
  }

  // Called on player login — processes any queued events for them
  static async deliverPendingEvents(uid) {
    const eventRef = await getDoc(doc(db, "admin", "events"));
    if (!eventRef.exists()) return;

    const queue   = eventRef.data().queue || [];
    const pending = queue.filter(e => e.targetUid === uid && !e.isDelivered);

    for (const event of pending) {
      await FirestoreDB._applyEvent(uid, event);
    }

    // Mark delivered
    const updated = queue.map(e =>
      e.targetUid === uid && !e.isDelivered
        ? { ...e, isDelivered: true, deliveredAt: new Date().toISOString() }
        : e
    );
    await setDoc(doc(db, "admin", "events"), { queue: updated });
  }

  static async _applyEvent(uid, event) {
    const player = await FirestoreDB.getPlayer(uid);
    const { type, payload } = event;

    if (type === "fraud_charge") {
      const newBal = player.checkingBalance - payload.amount;
      await FirestoreDB.updatePlayer(uid, {
        checkingBalance: newBal,
        hasFraudCharge:  true,
        fraudAmount:     payload.amount,
        fraudMerchant:   payload.merchant || "ONLINE PURCHASE",
      });
      await FirestoreDB.addTransaction(uid, {
        merchant:    payload.merchant || "ONLINE PURCHASE",
        description: "Unauthorized charge",
        amount:      -payload.amount, category: "fraud",
        gameDay: player.gameDay, month: player.gameMonth, year: player.gameYear,
        isFraud: true,
      }, newBal);
      // No email — player must notice it themselves on bank statement

    } else if (type === "eviction_warning") {
      await FirestoreDB.queueEmail(uid, "eviction_warning", payload);

    } else if (type === "eviction_notice") {
      await FirestoreDB.queueEmail(uid, "eviction_notice", payload);

    } else if (type === "fired") {
      await FirestoreDB.updatePlayer(uid, {
        annualSalary: 0, jobId: null, jobTitle: null, employer: null
      });
      await FirestoreDB.queueEmail(uid, "termination_notice", payload);

    } else if (type === "bonus") {
      const amount = payload.amount || 2000;
      const newBal = player.checkingBalance + amount;
      await FirestoreDB.updatePlayer(uid, { checkingBalance: newBal });
      await FirestoreDB.addTransaction(uid, {
        merchant:    player.employer || "Employer",
        description: "Performance bonus",
        amount, category: "income",
        gameDay: player.gameDay, month: player.gameMonth, year: player.gameYear
      }, newBal);
      await FirestoreDB.queueEmail(uid, "bonus_received", { amount });

    } else if (type === "promotion") {
      const newSalary = Math.round(player.annualSalary * 1.15);
      await FirestoreDB.updatePlayer(uid, { annualSalary: newSalary });
      await FirestoreDB.queueEmail(uid, "promotion_notice", {
        note: `New salary: $${newSalary.toLocaleString()}/yr`
      });

    } else if (type === "raise") {
      const newSalary = Math.round(player.annualSalary * 1.05);
      await FirestoreDB.updatePlayer(uid, { annualSalary: newSalary });
      await FirestoreDB.queueEmail(uid, "raise_notice", {
        note: `New salary: $${newSalary.toLocaleString()}/yr`
      });

    } else if (type === "emergency") {
      const amount = payload.amount || 1500;
      const newBal = player.checkingBalance - amount;
      await FirestoreDB.updatePlayer(uid, { checkingBalance: newBal });
      await FirestoreDB.addTransaction(uid, {
        merchant:    payload.merchant || "Emergency Services",
        description: payload.description || "Unexpected emergency expense",
        amount:      -amount, category: "other",
        gameDay: player.gameDay, month: player.gameMonth, year: player.gameYear
      }, newBal);
      await FirestoreDB.queueEmail(uid, "emergency_expense", { amount });

    } else if (type === "custom_email") {
      // Teacher sends a fully custom email
      await addDoc(collection(db, "players", uid, "emails"), {
        from:           payload.from || "Metropolis Administration",
        fromEmail:      payload.fromEmail || "admin@metropolis.edu",
        subject:        payload.subject,
        body:           payload.body,
        isRead:         false,
        isStarred:      false,
        receivedAt:     serverTimestamp(),
        templateId:     "custom",
        actionRequired: payload.actionRequired || false,
        actionType:     null,
      });
    }
  }

  // ── Admin — Student Requests ─────────────────────────────

  // Student submits a request (loan app, fraud dispute, rent extension, etc.)
  static async submitRequest(uid, { type, subject, body, amount = null }) {
    const player = await FirestoreDB.getPlayer(uid);
    await addDoc(collection(db, "admin", "requests"), {
      fromUid:   uid,
      fromName:  `${player.firstName} ${player.lastName}`,
      type, subject, body, amount,
      status:    "pending",
      adminNote: "",
      createdAt: serverTimestamp(),
      resolvedAt: null,
      responseEmailSent: false,
    });
  }

  // Admin approves or denies a request — triggers response email
  static async resolveRequest(requestId, { approved, adminNote = "" }) {
    const reqRef  = doc(db, "admin", "requests", requestId);
    const reqSnap = await getDoc(reqRef);
    const req     = reqSnap.data();

    const status = approved ? "approved" : "denied";
    await updateDoc(reqRef, {
      status, adminNote, resolvedAt: serverTimestamp(), responseEmailSent: true
    });

    // Pick template based on request type + decision
    const templateMap = {
      loan:          approved ? "loan_approved"         : "loan_denied",
      fraud_dispute: approved ? "fraud_dispute_approved": "fraud_dispute_denied",
      rent_extension: approved ? "rent_extension_approved" : "rent_extension_denied",
      credit_card:   approved ? "credit_approved"       : "credit_denied",
      mortgage:      approved ? "mortgage_approved"     : "mortgage_denied",
    };
    const templateId = templateMap[req.type] || (approved ? "request_approved" : "request_denied");

    // For fraud dispute approval — reverse the charge
    if (req.type === "fraud_dispute" && approved) {
      const player = await FirestoreDB.getPlayer(req.fromUid);
      const refundAmount = player.fraudAmount;
      const newBal = player.checkingBalance + refundAmount;
      await FirestoreDB.updatePlayer(req.fromUid, {
        checkingBalance: newBal, hasFraudCharge: false, fraudAmount: 0
      });
      await FirestoreDB.addTransaction(req.fromUid, {
        merchant:    "Siena Credit Union",
        description: "Fraud dispute refund",
        amount:      refundAmount, category: "other",
        gameDay: player.gameDay, month: player.gameMonth, year: player.gameYear
      }, newBal);
    }

    await FirestoreDB.queueEmail(req.fromUid, templateId, {
      amount: req.amount, note: adminNote
    });
  }

  // Real-time listener for admin to see incoming requests
  static listenToRequests(callback) {
    return onSnapshot(
      query(collection(db, "admin", "requests"),
            where("status", "==", "pending"),
            orderBy("createdAt", "desc")),
      snap => callback(snap.docs.map(d => ({ ...d.data(), requestId: d.id })))
    );
  }

  // ── Groceries ────────────────────────────────────────────

  static async getGroceryItems() {
    const snap = await getDocs(collection(db, "groceries"));
    return snap.docs.map(d => ({ ...d.data(), itemId: d.id }));
  }

  // ── Apartments ───────────────────────────────────────────

  static async getAvailableApartments() {
    const snap = await getDocs(
      query(collection(db, "apartments"), where("isAvailable", "==", true))
    );
    return snap.docs.map(d => ({ ...d.data(), aptId: d.id }));
  }

  static async getAdminConfig() {
    try {
      const snap = await getDoc(doc(db, "admin", "config"));
      return snap.exists() ? snap.data() : null;
    } catch(e) { return null; }
  }

  static async setAdminConfig(data) {
    await setDoc(doc(db, "admin", "config"), data, { merge: true });
  }
}

// ============================================================
// EMAIL TEMPLATES
// ============================================================
// {name}, {firstName}, {lastName}, {amount}, {month},
// {dueDate}, {merchant}, {address}, {reason}, {balance}, {note}
// ============================================================

const EMAIL_TEMPLATES = {

  welcome: {
    from: "Metropolis University", fromEmail: "noreply@metropolis.edu",
    subject: "Welcome to Metropolis — Your New Life Begins",
    body: `Dear {firstName},

Congratulations on your graduation. After years of hard work, you've earned your degree and you're ready for what comes next.

The city is waiting.

You'll need to find a place to live, apply for a job, and start managing your finances — all on your own. Nobody is going to hand you anything here.

A few things to get started:
  1. Check the Job Board on your computer
  2. Browse housing on the rental site
  3. Visit Siena Credit Union to review your starting balance
  4. Add your first tasks to your To-Do List

Good luck out there.

— Metropolis University, Office of Graduate Affairs`,
    actionRequired: false,
  },

  rent_reminder: {
    from: "Metropolis Property Management", fromEmail: "billing@metropolispm.com",
    subject: "Rent Due — {month}",
    body: `Dear {firstName},

This is your monthly reminder that rent is due on Day 1 of every month.

Your current monthly rent: {amount}
Due date: {dueDate}

You may pay through the Rent Portal on your home computer. Late fees apply per the terms of your lease.

Please do not ignore this notice.

— Metropolis Property Management`,
    actionRequired: true, actionType: null,
  },

  rent_nsf: {
    from: "Siena Credit Union", fromEmail: "alerts@sienacreditunion.com",
    subject: "Payment Returned — Insufficient Funds",
    body: `Dear {firstName},

We attempted to process a rent payment of {amount} on your behalf. Unfortunately, your account did not have sufficient funds to cover this transaction.

Your account is now overdrawn. Please deposit funds immediately to avoid additional fees.

Current balance: {balance}

Contact us at (703) 555-0100 or visit your nearest branch.

— Siena Credit Union
Member FDIC`,
    actionRequired: true, actionType: null,
  },

  lease_signed: {
    from: "Metropolis Property Management", fromEmail: "leasing@metropolispm.com",
    subject: "Lease Confirmed — Welcome Home",
    body: `Dear {firstName},

Your lease has been signed and your security deposit received. Welcome to your new home.

Address: {address}
Monthly Rent: {amount}/month
Rent Due: Day 1 of every month

Your lease terms are on file. Please review the late payment policy included with your welcome packet.

If you have any questions, visit the leasing office in your building.

— Metropolis Property Management`,
    actionRequired: false,
  },

  job_offer_accepted: {
    from: "Metropolis Career Services", fromEmail: "careers@metropolis.edu",
    subject: "Offer Accepted — Congratulations!",
    body: `Dear {firstName},

We've received confirmation that you have accepted a job offer. This is a major milestone — congratulations.

Position details: {note}

Your first paycheck will arrive on schedule based on your pay frequency. Make sure to review your benefits package carefully — enrollment deadlines may apply.

Best of luck in your new role.

— Metropolis Career Services`,
    actionRequired: false,
  },

  termination_notice: {
    from: "Human Resources", fromEmail: "hr@employer.com",
    subject: "Notice of Employment Termination",
    body: `Dear {firstName},

We regret to inform you that your employment has been terminated effective immediately.

Your final paycheck will be processed according to state law. Please return any company property within 5 business days.

You are encouraged to file for unemployment benefits if eligible. Information is available at the Metropolis Department of Labor.

This decision is final.

— Human Resources Department`,
    actionRequired: true, actionType: null,
  },

  eviction_warning: {
    from: "Metropolis Property Management", fromEmail: "legal@metropolispm.com",
    subject: "NOTICE: Rent Past Due — Immediate Action Required",
    body: `Dear {firstName},

Our records indicate that your rent payment for this month has not been received. This is your formal warning.

Under the terms of your lease, a late fee has been applied to your account. If payment is not received within the timeframe specified in your lease, formal eviction proceedings may begin.

Please log into the Rent Portal immediately and submit your payment.

Do not ignore this notice.

— Metropolis Property Management, Legal Department`,
    actionRequired: true, actionType: null,
  },

  eviction_notice: {
    from: "Metropolis Property Management — Legal", fromEmail: "legal@metropolispm.com",
    subject: "FORMAL EVICTION NOTICE — {firstName} {lastName}",
    body: `Dear {firstName} {lastName},

This is a formal Notice to Quit and Vacate.

You have failed to pay rent as required by your lease agreement. Despite previous warnings, this matter has not been resolved.

You are hereby notified that you must vacate the premises at {address} within 5 business days of receiving this notice, or pay all outstanding rent and fees in full immediately.

Failure to comply will result in legal action and removal by law enforcement.

— Metropolis Property Management
  c/o Vance, Holloway & Steele LLP`,
    actionRequired: true, actionType: null,
  },

  bonus_received: {
    from: "Payroll Department", fromEmail: "payroll@employer.com",
    subject: "Performance Bonus Deposited — {amount}",
    body: `Dear {firstName},

We are pleased to inform you that a performance bonus of {amount} has been deposited into your account on file.

This reflects the company's recognition of your contributions. Keep up the excellent work.

— Payroll Department`,
    actionRequired: false,
  },

  promotion_notice: {
    from: "Human Resources", fromEmail: "hr@employer.com",
    subject: "Congratulations — You've Been Promoted",
    body: `Dear {firstName},

On behalf of the team, congratulations on your promotion.

{note}

Your updated compensation takes effect immediately. Your next paycheck will reflect the new amount.

We look forward to your continued growth with the company.

— Human Resources`,
    actionRequired: false,
  },

  raise_notice: {
    from: "Human Resources", fromEmail: "hr@employer.com",
    subject: "Salary Adjustment Notice",
    body: `Dear {firstName},

Following your recent performance review, we are pleased to inform you of a salary increase.

{note}

The adjustment is effective as of your next pay period. Thank you for your continued dedication.

— Human Resources`,
    actionRequired: false,
  },

  emergency_expense: {
    from: "Siena Credit Union", fromEmail: "alerts@sienacreditunion.com",
    subject: "Transaction Alert — {amount} Debit",
    body: `Dear {firstName},

A debit of {amount} has been processed from your checking account.

If you did not authorize this transaction, please visit your nearest branch or call (703) 555-0100 immediately.

Current balance: {balance}

— Siena Credit Union
Member FDIC`,
    actionRequired: false,
  },

  loan_approved: {
    from: "Siena Credit Union — Lending", fromEmail: "lending@sienacreditunion.com",
    subject: "Loan Application — APPROVED",
    body: `Dear {firstName},

We are pleased to inform you that your loan application has been approved.

Loan amount: {amount}
Terms and repayment schedule have been added to your account.

The funds will be deposited into your checking account within 1–2 business days.

Please review the repayment schedule carefully. Missing payments will affect your credit score.

— Siena Credit Union, Lending Division`,
    actionRequired: false,
  },

  loan_denied: {
    from: "Siena Credit Union — Lending", fromEmail: "lending@sienacreditunion.com",
    subject: "Loan Application — Not Approved",
    body: `Dear {firstName},

Thank you for your recent loan application. After careful review, we are unable to approve your request at this time.

Reason: {note}

You may reapply in 30 days or speak with a loan officer to discuss your options.

— Siena Credit Union, Lending Division`,
    actionRequired: false,
  },

  fraud_dispute_approved: {
    from: "Siena Credit Union — Fraud Department", fromEmail: "fraud@sienacreditunion.com",
    subject: "Fraud Claim Approved — Refund Issued",
    body: `Dear {firstName},

After a thorough investigation, we have determined that the disputed charge of {amount} was fraudulent.

A full refund has been credited to your account. The charge has been removed from your statement.

We have blocked the merchant and taken steps to secure your account. A new card has been issued — you will receive it within 5–7 business days.

Thank you for reporting this promptly.

— Siena Credit Union, Fraud Department`,
    actionRequired: false,
  },

  fraud_dispute_denied: {
    from: "Siena Credit Union — Fraud Department", fromEmail: "fraud@sienacreditunion.com",
    subject: "Fraud Claim — Unable to Process",
    body: `Dear {firstName},

We have completed our review of your fraud dispute claim.

Based on our investigation, we were unable to confirm that the charge of {amount} was unauthorized. The claim has been closed.

If you believe this decision is in error, you may request an escalated review by visiting any branch with a valid government-issued ID.

Reason: {note}

— Siena Credit Union, Fraud Department`,
    actionRequired: false,
  },

  rent_extension_approved: {
    from: "Metropolis Property Management", fromEmail: "billing@metropolispm.com",
    subject: "Rent Extension Granted",
    body: `Dear {firstName},

Your request for a rent payment extension has been approved.

{note}

Please ensure payment is submitted by the extended due date. This is a one-time accommodation. Further extensions will not be granted.

— Metropolis Property Management`,
    actionRequired: false,
  },

  rent_extension_denied: {
    from: "Metropolis Property Management", fromEmail: "billing@metropolispm.com",
    subject: "Rent Extension — Request Denied",
    body: `Dear {firstName},

We have reviewed your request for a rent payment extension.

Unfortunately, your request has been denied. Rent remains due per your lease terms.

{note}

Please submit payment immediately to avoid late fees and eviction proceedings.

— Metropolis Property Management`,
    actionRequired: true, actionType: null,
  },

  credit_approved: {
    from: "Siena Credit Union — Credit Division", fromEmail: "credit@sienacreditunion.com",
    subject: "Credit Card Application — Approved",
    body: `Dear {firstName},

Congratulations — your credit card application has been approved.

Credit limit: {amount}
Your card will arrive in 7–10 business days.

Please use credit responsibly. Your balance is due in full each month to avoid interest charges. Late payments will affect your credit score.

— Siena Credit Union, Credit Division`,
    actionRequired: false,
  },

  credit_denied: {
    from: "Siena Credit Union — Credit Division", fromEmail: "credit@sienacreditunion.com",
    subject: "Credit Card Application — Not Approved",
    body: `Dear {firstName},

Thank you for applying for a Siena Credit Union credit card.

After reviewing your application, we are unable to extend credit at this time.

Reason: {note}

You may reapply after 6 months, or speak with a representative about secured card options.

— Siena Credit Union, Credit Division`,
    actionRequired: false,
  },

  mortgage_approved: {
    from: "Siena Credit Union — Mortgage", fromEmail: "mortgage@sienacreditunion.com",
    subject: "Mortgage Pre-Approval — Congratulations",
    body: `Dear {firstName},

You have been pre-approved for a mortgage.

Pre-approved amount: {amount}
{note}

This pre-approval is valid for 90 days. Visit any branch to complete the full application and begin the home-buying process.

— Siena Credit Union, Mortgage Division`,
    actionRequired: false,
  },

  mortgage_denied: {
    from: "Siena Credit Union — Mortgage", fromEmail: "mortgage@sienacreditunion.com",
    subject: "Mortgage Application — Not Approved",
    body: `Dear {firstName},

Thank you for your mortgage application. We have completed our review.

At this time, we are unable to approve your application.

Reason: {note}

We encourage you to continue building your credit and savings and reapply when your financial situation improves.

— Siena Credit Union, Mortgage Division`,
    actionRequired: false,
  },

  request_approved: {
    from: "Metropolis Administration", fromEmail: "admin@metropolis.edu",
    subject: "Your Request Has Been Approved",
    body: `Dear {firstName},

Your recent request has been reviewed and approved.

{note}

If you have any questions, please respond to this email.

— Metropolis Administration`,
    actionRequired: false,
  },

  request_denied: {
    from: "Metropolis Administration", fromEmail: "admin@metropolis.edu",
    subject: "Your Request — Not Approved",
    body: `Dear {firstName},

Your recent request has been reviewed.

Unfortunately, it has not been approved at this time.

{note}

— Metropolis Administration`,
    actionRequired: false,
  },
};

export { db, EMAIL_TEMPLATES };