// ============================================================
// METROPOLIS — Firestore Seed Data
// seed-data.js
//
// Run this ONCE from the admin panel to populate the database.
// All prices/rents are Fairfax County, VA realistic (2025).
//
// Usage:
//   import { seedDatabase } from './seed-data.js';
//   await seedDatabase();   ← call from admin setup screen
// ============================================================

import { db } from './firebase-schema.js';
import {
  collection, doc, setDoc, writeBatch, getDocs, deleteDoc
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// ============================================================
// RENT LATE-FEE POLICIES
// Randomly assigned to apartments
// ============================================================
export const RENT_POLICIES = [
  {
    id: "policy_a",
    label: "5% fee after 5 days late",
    description: "Rent not received by Day 6 incurs a one-time 5% late fee.",
    type: "percent_flat",
    graceDays: 5,
    feePercent: 0.05,
    feeFlat: 0,
    maxDays: null,
  },
  {
    id: "policy_b",
    label: "1% per day for up to 10 days",
    description: "Each day past the due date adds 1% of monthly rent, capped at 10 days.",
    type: "percent_daily",
    graceDays: 0,
    feePercent: 0.01,
    feeFlat: 0,
    maxDays: 10,
  },
  {
    id: "policy_c",
    label: "$50 flat fee after 3 days",
    description: "A flat $50 fee applies if rent is not received by Day 4.",
    type: "flat",
    graceDays: 3,
    feePercent: 0,
    feeFlat: 50,
    maxDays: null,
  },
  {
    id: "policy_d",
    label: "$25/day after 7-day grace period",
    description: "No penalty for the first 7 days. After that, $25 per additional day.",
    type: "flat_daily",
    graceDays: 7,
    feePercent: 0,
    feeFlat: 25,
    maxDays: null,
  },
  {
    id: "policy_e",
    label: "10% fee + $100 legal notice after 14 days",
    description: "10% late fee after Day 3; formal legal notice issued if still unpaid after Day 14.",
    type: "percent_flat_escalating",
    graceDays: 3,
    feePercent: 0.10,
    feeFlat: 100,
    maxDays: 14,
    escalation: "eviction_notice",
  },
];

// ============================================================
// APARTMENT BUILDINGS & UNITS (6 buildings, ~60 total units)
// Fairfax County, VA / Northern Virginia rent ranges (2025)
// Studio: $1,400–$1,700 | 1BR: $1,750–$2,300 | 2BR: $2,400–$3,100
// ============================================================
export const APARTMENTS = [

  // ── BUILDING 1: Meridian Heights (upscale, Arlington) ──
  { aptId:"MH-S1",  buildingName:"Meridian Heights", buildingId:"apt_b1", unit:"S1",  address:"1240 Meridian Ave, Arlington, VA 22201",   monthlyRent:1650, bedrooms:0, bathrooms:1, sqft:520,  amenities:["Rooftop Deck","Gym","Concierge","Package Room"], petFriendly:false, rentPolicyId:"policy_a", securityDeposit:1650, isAvailable:true, tenantUid:null, description:"Modern studio with floor-to-ceiling windows and city views. Walking distance to Clarendon Metro." },
  { aptId:"MH-S2",  buildingName:"Meridian Heights", buildingId:"apt_b1", unit:"S2",  address:"1240 Meridian Ave, Arlington, VA 22201",   monthlyRent:1695, bedrooms:0, bathrooms:1, sqft:540,  amenities:["Rooftop Deck","Gym","Concierge","Package Room"], petFriendly:false, rentPolicyId:"policy_a", securityDeposit:1695, isAvailable:true, tenantUid:null, description:"Corner studio unit. Upgraded kitchen finishes. High-speed fiber included." },
  { aptId:"MH-1A",  buildingName:"Meridian Heights", buildingId:"apt_b1", unit:"1A",  address:"1240 Meridian Ave, Arlington, VA 22201",   monthlyRent:2150, bedrooms:1, bathrooms:1, sqft:780,  amenities:["Rooftop Deck","Gym","Concierge","Parking"], petFriendly:true,  rentPolicyId:"policy_a", securityDeposit:2150, isAvailable:true, tenantUid:null, description:"Spacious 1BR with hardwood floors and in-unit W/D. Parking spot included." },
  { aptId:"MH-1B",  buildingName:"Meridian Heights", buildingId:"apt_b1", unit:"1B",  address:"1240 Meridian Ave, Arlington, VA 22201",   monthlyRent:2200, bedrooms:1, bathrooms:1, sqft:800,  amenities:["Rooftop Deck","Gym","Concierge","Parking"], petFriendly:true,  rentPolicyId:"policy_a", securityDeposit:2200, isAvailable:true, tenantUid:null, description:"High-floor 1BR with panoramic views. Quartz counters, stainless appliances." },
  { aptId:"MH-2A",  buildingName:"Meridian Heights", buildingId:"apt_b1", unit:"2A",  address:"1240 Meridian Ave, Arlington, VA 22201",   monthlyRent:2950, bedrooms:2, bathrooms:2, sqft:1100, amenities:["Rooftop Deck","Gym","Concierge","2 Parking Spots"], petFriendly:true, rentPolicyId:"policy_a", securityDeposit:2950, isAvailable:true, tenantUid:null, description:"Luxury 2BR/2BA. Open floor plan, private balcony, walk-in closets." },

  // ── BUILDING 2: The Fairfax Commons (mid-range, Fairfax City) ──
  { aptId:"FC-S1",  buildingName:"Fairfax Commons", buildingId:"apt_b2", unit:"101", address:"3850 Old Lee Hwy, Fairfax, VA 22030",      monthlyRent:1450, bedrooms:0, bathrooms:1, sqft:490,  amenities:["Pool","Laundry Room","Surface Parking"], petFriendly:false, rentPolicyId:"policy_b", securityDeposit:1450, isAvailable:true, tenantUid:null, description:"Affordable studio near GMU. Quiet complex with on-site laundry." },
  { aptId:"FC-S2",  buildingName:"Fairfax Commons", buildingId:"apt_b2", unit:"102", address:"3850 Old Lee Hwy, Fairfax, VA 22030",      monthlyRent:1475, bedrooms:0, bathrooms:1, sqft:500,  amenities:["Pool","Laundry Room","Surface Parking"], petFriendly:false, rentPolicyId:"policy_b", securityDeposit:1475, isAvailable:true, tenantUid:null, description:"Ground floor studio. Patio access. Close to Route 50 commuter routes." },
  { aptId:"FC-1A",  buildingName:"Fairfax Commons", buildingId:"apt_b2", unit:"201", address:"3850 Old Lee Hwy, Fairfax, VA 22030",      monthlyRent:1795, bedrooms:1, bathrooms:1, sqft:720,  amenities:["Pool","Laundry Room","Assigned Parking"], petFriendly:true,  rentPolicyId:"policy_b", securityDeposit:1795, isAvailable:true, tenantUid:null, description:"Sunny 1BR on second floor. Updated kitchen, carpeted bedrooms." },
  { aptId:"FC-1B",  buildingName:"Fairfax Commons", buildingId:"apt_b2", unit:"202", address:"3850 Old Lee Hwy, Fairfax, VA 22030",      monthlyRent:1825, bedrooms:1, bathrooms:1, sqft:740,  amenities:["Pool","Laundry Room","Assigned Parking"], petFriendly:true,  rentPolicyId:"policy_b", securityDeposit:1825, isAvailable:true, tenantUid:null, description:"1BR with walk-in closet. Utilities not included." },
  { aptId:"FC-2A",  buildingName:"Fairfax Commons", buildingId:"apt_b2", unit:"301", address:"3850 Old Lee Hwy, Fairfax, VA 22030",      monthlyRent:2450, bedrooms:2, bathrooms:1, sqft:980,  amenities:["Pool","Laundry Room","2 Parking Spots"], petFriendly:true, rentPolicyId:"policy_b", securityDeposit:2450, isAvailable:true, tenantUid:null, description:"Spacious 2BR with shared bath. Great for roommates. Large living area." },
  { aptId:"FC-2B",  buildingName:"Fairfax Commons", buildingId:"apt_b2", unit:"302", address:"3850 Old Lee Hwy, Fairfax, VA 22030",      monthlyRent:2500, bedrooms:2, bathrooms:2, sqft:1020, amenities:["Pool","Laundry Room","2 Parking Spots"], petFriendly:true, rentPolicyId:"policy_b", securityDeposit:2500, isAvailable:true, tenantUid:null, description:"Top-floor 2BR/2BA. Private balcony, pool views." },

  // ── BUILDING 3: Reston Flats (budget, Reston) ──
  { aptId:"RF-S1",  buildingName:"Reston Flats", buildingId:"apt_b3", unit:"A1",  address:"11600 Baron Cameron Ave, Reston, VA 20190",  monthlyRent:1399, bedrooms:0, bathrooms:1, sqft:460,  amenities:["Laundry Room","Street Parking"], petFriendly:false, rentPolicyId:"policy_c", securityDeposit:700, isAvailable:true, tenantUid:null, description:"No-frills studio at one of the lowest price points in the area. Cash-only deposit." },
  { aptId:"RF-S2",  buildingName:"Reston Flats", buildingId:"apt_b3", unit:"A2",  address:"11600 Baron Cameron Ave, Reston, VA 20190",  monthlyRent:1415, bedrooms:0, bathrooms:1, sqft:470,  amenities:["Laundry Room","Street Parking"], petFriendly:false, rentPolicyId:"policy_c", securityDeposit:700, isAvailable:true, tenantUid:null, description:"Budget studio. Close to Reston Town Center and Silver Line Metro." },
  { aptId:"RF-1A",  buildingName:"Reston Flats", buildingId:"apt_b3", unit:"B1",  address:"11600 Baron Cameron Ave, Reston, VA 20190",  monthlyRent:1750, bedrooms:1, bathrooms:1, sqft:680,  amenities:["Laundry Room","Assigned Parking"], petFriendly:false, rentPolicyId:"policy_c", securityDeposit:875, isAvailable:true, tenantUid:null, description:"Basic 1BR. Heat included in rent. Month-to-month option available." },
  { aptId:"RF-1B",  buildingName:"Reston Flats", buildingId:"apt_b3", unit:"B2",  address:"11600 Baron Cameron Ave, Reston, VA 20190",  monthlyRent:1775, bedrooms:1, bathrooms:1, sqft:700,  amenities:["Laundry Room","Assigned Parking"], petFriendly:false, rentPolicyId:"policy_c", securityDeposit:875, isAvailable:true, tenantUid:null, description:"Updated 1BR with new appliances. Quiet side of building." },
  { aptId:"RF-2A",  buildingName:"Reston Flats", buildingId:"apt_b3", unit:"C1",  address:"11600 Baron Cameron Ave, Reston, VA 20190",  monthlyRent:2400, bedrooms:2, bathrooms:1, sqft:920,  amenities:["Laundry Room","2 Street Spots"], petFriendly:true, rentPolicyId:"policy_c", securityDeposit:1200, isAvailable:true, tenantUid:null, description:"Largest unit in the complex. Two full bedrooms, one shared bath." },

  // ── BUILDING 4: Nova Park Residences (modern, Tysons) ──
  { aptId:"NP-S1",  buildingName:"Nova Park Residences", buildingId:"apt_b4", unit:"101", address:"7700 Leesburg Pike, Falls Church, VA 22043", monthlyRent:1595, bedrooms:0, bathrooms:1, sqft:510,  amenities:["Fitness Center","Co-Working Lounge","Garage Parking"], petFriendly:true,  rentPolicyId:"policy_d", securityDeposit:1595, isAvailable:true, tenantUid:null, description:"Smart-home enabled studio near Tysons Corner. Keyless entry, thermostat app." },
  { aptId:"NP-1A",  buildingName:"Nova Park Residences", buildingId:"apt_b4", unit:"201", address:"7700 Leesburg Pike, Falls Church, VA 22043", monthlyRent:1990, bedrooms:1, bathrooms:1, sqft:760,  amenities:["Fitness Center","Co-Working Lounge","Garage Parking"], petFriendly:true,  rentPolicyId:"policy_d", securityDeposit:1990, isAvailable:true, tenantUid:null, description:"1BR with 9-ft ceilings and chef's kitchen. EV charging in garage." },
  { aptId:"NP-1B",  buildingName:"Nova Park Residences", buildingId:"apt_b4", unit:"202", address:"7700 Leesburg Pike, Falls Church, VA 22043", monthlyRent:2050, bedrooms:1, bathrooms:1, sqft:780,  amenities:["Fitness Center","Co-Working Lounge","Garage Parking"], petFriendly:true,  rentPolicyId:"policy_d", securityDeposit:2050, isAvailable:true, tenantUid:null, description:"Corner 1BR with dual-exposure windows. Built-in desk nook." },
  { aptId:"NP-2A",  buildingName:"Nova Park Residences", buildingId:"apt_b4", unit:"301", address:"7700 Leesburg Pike, Falls Church, VA 22043", monthlyRent:2750, bedrooms:2, bathrooms:2, sqft:1080, amenities:["Fitness Center","Co-Working Lounge","2 Garage Spots","Storage Unit"], petFriendly:true, rentPolicyId:"policy_d", securityDeposit:2750, isAvailable:true, tenantUid:null, description:"Premium 2BR/2BA. Split bedroom layout, large closets, in-unit W/D." },
  { aptId:"NP-2B",  buildingName:"Nova Park Residences", buildingId:"apt_b4", unit:"302", address:"7700 Leesburg Pike, Falls Church, VA 22043", monthlyRent:2850, bedrooms:2, bathrooms:2, sqft:1120, amenities:["Fitness Center","Co-Working Lounge","2 Garage Spots","Storage Unit"], petFriendly:true, rentPolicyId:"policy_d", securityDeposit:2850, isAvailable:true, tenantUid:null, description:"Top-floor 2BR with terrace. City views, extra storage included." },

  // ── BUILDING 5: Centennial Court (suburban, Centreville) ──
  { aptId:"CC-S1",  buildingName:"Centennial Court", buildingId:"apt_b5", unit:"10",  address:"6200 Stone Rd, Centreville, VA 20121",       monthlyRent:1425, bedrooms:0, bathrooms:1, sqft:475,  amenities:["Pool","Picnic Area","Free Parking"], petFriendly:false, rentPolicyId:"policy_e", securityDeposit:1425, isAvailable:true, tenantUid:null, description:"Studio in quiet suburban complex. Commuter-friendly location off Route 28." },
  { aptId:"CC-1A",  buildingName:"Centennial Court", buildingId:"apt_b5", unit:"11",  address:"6200 Stone Rd, Centreville, VA 20121",       monthlyRent:1760, bedrooms:1, bathrooms:1, sqft:710,  amenities:["Pool","Picnic Area","Free Parking"], petFriendly:true, rentPolicyId:"policy_e", securityDeposit:1760, isAvailable:true, tenantUid:null, description:"Large 1BR with screened porch. Wooded views, close to Sully Historic Site." },
  { aptId:"CC-1B",  buildingName:"Centennial Court", buildingId:"apt_b5", unit:"12",  address:"6200 Stone Rd, Centreville, VA 20121",       monthlyRent:1800, bedrooms:1, bathrooms:1, sqft:730,  amenities:["Pool","Picnic Area","Free Parking"], petFriendly:true, rentPolicyId:"policy_e", securityDeposit:1800, isAvailable:true, tenantUid:null, description:"Renovated 1BR. New flooring, updated bath, storage shed included." },
  { aptId:"CC-2A",  buildingName:"Centennial Court", buildingId:"apt_b5", unit:"20",  address:"6200 Stone Rd, Centreville, VA 20121",       monthlyRent:2350, bedrooms:2, bathrooms:1, sqft:960,  amenities:["Pool","Picnic Area","2 Free Spots"], petFriendly:true, rentPolicyId:"policy_e", securityDeposit:2350, isAvailable:true, tenantUid:null, description:"Townhouse-style 2BR. Private entrance, fenced yard, washer/dryer hookups." },
  { aptId:"CC-2B",  buildingName:"Centennial Court", buildingId:"apt_b5", unit:"21",  address:"6200 Stone Rd, Centreville, VA 20121",       monthlyRent:2400, bedrooms:2, bathrooms:2, sqft:1010, amenities:["Pool","Picnic Area","2 Free Spots"], petFriendly:true, rentPolicyId:"policy_e", securityDeposit:2400, isAvailable:true, tenantUid:null, description:"End-unit 2BR/2BA townhome. Extra windows, attached storage." },

  // ── BUILDING 6: The Annandale (older stock, Annandale) ──
  { aptId:"AN-S1",  buildingName:"The Annandale", buildingId:"apt_b6", unit:"1A",  address:"4410 Ravensworth Rd, Annandale, VA 22003",   monthlyRent:1380, bedrooms:0, bathrooms:1, sqft:450,  amenities:["Laundry Room","Parking Lot"], petFriendly:false, rentPolicyId:"policy_a", securityDeposit:1380, isAvailable:true, tenantUid:null, description:"Older building, lowest rent in the city. Utilities partially included (heat/water)." },
  { aptId:"AN-S2",  buildingName:"The Annandale", buildingId:"apt_b6", unit:"1B",  address:"4410 Ravensworth Rd, Annandale, VA 22003",   monthlyRent:1395, bedrooms:0, bathrooms:1, sqft:460,  amenities:["Laundry Room","Parking Lot"], petFriendly:false, rentPolicyId:"policy_a", securityDeposit:1395, isAvailable:true, tenantUid:null, description:"Good bones, dated finishes. Heat and water included. 5 min to I-495." },
  { aptId:"AN-1A",  buildingName:"The Annandale", buildingId:"apt_b6", unit:"2A",  address:"4410 Ravensworth Rd, Annandale, VA 22003",   monthlyRent:1720, bedrooms:1, bathrooms:1, sqft:660,  amenities:["Laundry Room","Parking Lot"], petFriendly:true, rentPolicyId:"policy_a", securityDeposit:1720, isAvailable:true, tenantUid:null, description:"1BR with original hardwood floors. High ceilings, older appliances." },
  { aptId:"AN-1B",  buildingName:"The Annandale", buildingId:"apt_b6", unit:"2B",  address:"4410 Ravensworth Rd, Annandale, VA 22003",   monthlyRent:1745, bedrooms:1, bathrooms:1, sqft:680,  amenities:["Laundry Room","Parking Lot"], petFriendly:true, rentPolicyId:"policy_a", securityDeposit:1745, isAvailable:true, tenantUid:null, description:"Corner 1BR. Lots of light. Renovated bathroom." },
  { aptId:"AN-2A",  buildingName:"The Annandale", buildingId:"apt_b6", unit:"3A",  address:"4410 Ravensworth Rd, Annandale, VA 22003",   monthlyRent:2275, bedrooms:2, bathrooms:1, sqft:890,  amenities:["Laundry Room","2 Parking Spots"], petFriendly:true, rentPolicyId:"policy_a", securityDeposit:2275, isAvailable:true, tenantUid:null, description:"Large 2BR with separate dining room. Old-school charm, solid construction." },
];

// ============================================================
// GROCERY ITEMS — Fairfax County, VA realistic prices (2025)
// Prices based on Safeway / Giant / Wegmans averages
// ============================================================
export const GROCERY_ITEMS = [
  // DAIRY
  { itemId:"gro_001", name:"Whole Milk (1 gallon)",          category:"dairy",     price:4.29,  unit:"each",  groceryValue:8  },
  { itemId:"gro_002", name:"2% Milk (1 gallon)",             category:"dairy",     price:3.99,  unit:"each",  groceryValue:8  },
  { itemId:"gro_003", name:"Oat Milk (52 oz carton)",        category:"dairy",     price:5.49,  unit:"each",  groceryValue:7  },
  { itemId:"gro_004", name:"Eggs (1 dozen, large)",          category:"dairy",     price:4.79,  unit:"each",  groceryValue:10 },
  { itemId:"gro_005", name:"Butter (1 lb, salted)",          category:"dairy",     price:5.29,  unit:"each",  groceryValue:5  },
  { itemId:"gro_006", name:"Cheddar Cheese (8 oz block)",    category:"dairy",     price:4.49,  unit:"each",  groceryValue:6  },
  { itemId:"gro_007", name:"Greek Yogurt (32 oz)",           category:"dairy",     price:6.99,  unit:"each",  groceryValue:7  },
  { itemId:"gro_008", name:"Cream Cheese (8 oz)",            category:"dairy",     price:3.49,  unit:"each",  groceryValue:3  },
  { itemId:"gro_009", name:"Sour Cream (16 oz)",             category:"dairy",     price:3.29,  unit:"each",  groceryValue:3  },
  { itemId:"gro_010", name:"Heavy Cream (1 pint)",           category:"dairy",     price:4.99,  unit:"each",  groceryValue:3  },

  // PRODUCE
  { itemId:"gro_011", name:"Bananas (1 lb)",                 category:"produce",   price:0.69,  unit:"lb",    groceryValue:4  },
  { itemId:"gro_012", name:"Apples, Gala (3 lb bag)",        category:"produce",   price:4.99,  unit:"each",  groceryValue:8  },
  { itemId:"gro_013", name:"Baby Spinach (5 oz bag)",        category:"produce",   price:4.49,  unit:"each",  groceryValue:6  },
  { itemId:"gro_014", name:"Broccoli (per head)",            category:"produce",   price:2.49,  unit:"each",  groceryValue:5  },
  { itemId:"gro_015", name:"Romaine Lettuce (3-pack hearts)",category:"produce",   price:3.99,  unit:"each",  groceryValue:5  },
  { itemId:"gro_016", name:"Russet Potatoes (5 lb bag)",     category:"produce",   price:5.49,  unit:"each",  groceryValue:9  },
  { itemId:"gro_017", name:"Yellow Onions (3 lb bag)",       category:"produce",   price:3.29,  unit:"each",  groceryValue:5  },
  { itemId:"gro_018", name:"Garlic (3-bulb pack)",           category:"produce",   price:2.49,  unit:"each",  groceryValue:2  },
  { itemId:"gro_019", name:"Tomatoes, vine (1 lb)",          category:"produce",   price:2.99,  unit:"lb",    groceryValue:4  },
  { itemId:"gro_020", name:"Avocados (each)",                category:"produce",   price:1.49,  unit:"each",  groceryValue:3  },
  { itemId:"gro_021", name:"Bell Peppers (3-pack)",          category:"produce",   price:4.49,  unit:"each",  groceryValue:5  },
  { itemId:"gro_022", name:"Strawberries (1 lb)",            category:"produce",   price:4.99,  unit:"each",  groceryValue:5  },
  { itemId:"gro_023", name:"Blueberries (pint)",             category:"produce",   price:4.79,  unit:"each",  groceryValue:5  },
  { itemId:"gro_024", name:"Grapes, seedless red (2 lb)",    category:"produce",   price:5.99,  unit:"each",  groceryValue:7  },
  { itemId:"gro_025", name:"Lemons (3-pack)",                category:"produce",   price:2.29,  unit:"each",  groceryValue:2  },
  { itemId:"gro_026", name:"Carrots (1 lb bag)",             category:"produce",   price:1.49,  unit:"each",  groceryValue:4  },
  { itemId:"gro_027", name:"Cucumber (each)",                category:"produce",   price:1.29,  unit:"each",  groceryValue:3  },
  { itemId:"gro_028", name:"Celery (bunch)",                 category:"produce",   price:2.49,  unit:"each",  groceryValue:3  },
  { itemId:"gro_029", name:"Zucchini (each)",                category:"produce",   price:1.49,  unit:"each",  groceryValue:3  },
  { itemId:"gro_030", name:"Sweet Potatoes (3 lb bag)",      category:"produce",   price:4.99,  unit:"each",  groceryValue:8  },

  // MEAT & SEAFOOD
  { itemId:"gro_031", name:"Chicken Breast (1 lb)",          category:"meat",      price:5.99,  unit:"lb",    groceryValue:10 },
  { itemId:"gro_032", name:"Ground Beef 80/20 (1 lb)",       category:"meat",      price:6.49,  unit:"lb",    groceryValue:10 },
  { itemId:"gro_033", name:"Pork Chops (1 lb)",              category:"meat",      price:5.49,  unit:"lb",    groceryValue:9  },
  { itemId:"gro_034", name:"Salmon Fillet (1 lb)",           category:"meat",      price:12.99, unit:"lb",    groceryValue:10 },
  { itemId:"gro_035", name:"Tilapia Fillets (1 lb)",         category:"meat",      price:7.99,  unit:"lb",    groceryValue:10 },
  { itemId:"gro_036", name:"Bacon (16 oz pack)",             category:"meat",      price:7.99,  unit:"each",  groceryValue:8  },
  { itemId:"gro_037", name:"Turkey Deli Meat (8 oz)",        category:"meat",      price:5.49,  unit:"each",  groceryValue:5  },
  { itemId:"gro_038", name:"Hot Dogs (8-pack)",              category:"meat",      price:4.99,  unit:"each",  groceryValue:6  },
  { itemId:"gro_039", name:"Canned Tuna (5 oz)",             category:"meat",      price:1.99,  unit:"each",  groceryValue:4  },
  { itemId:"gro_040", name:"Chicken Thighs, bone-in (2 lb)",category:"meat",      price:7.98,  unit:"each",  groceryValue:12 },

  // BAKERY & BREAD
  { itemId:"gro_041", name:"White Sandwich Bread (20 oz)",   category:"bakery",    price:3.49,  unit:"each",  groceryValue:7  },
  { itemId:"gro_042", name:"Whole Wheat Bread (20 oz)",      category:"bakery",    price:3.99,  unit:"each",  groceryValue:7  },
  { itemId:"gro_043", name:"Bagels (6-pack)",                category:"bakery",    price:4.49,  unit:"each",  groceryValue:6  },
  { itemId:"gro_044", name:"English Muffins (6-pack)",       category:"bakery",    price:4.29,  unit:"each",  groceryValue:6  },
  { itemId:"gro_045", name:"Tortillas, flour (10-pack)",     category:"bakery",    price:3.99,  unit:"each",  groceryValue:6  },
  { itemId:"gro_046", name:"Rolls, dinner (12-pack)",        category:"bakery",    price:3.49,  unit:"each",  groceryValue:5  },
  { itemId:"gro_047", name:"Pita Bread (6-pack)",            category:"bakery",    price:3.79,  unit:"each",  groceryValue:5  },

  // PANTRY & DRY GOODS
  { itemId:"gro_048", name:"Spaghetti Pasta (16 oz)",        category:"pantry",    price:1.89,  unit:"each",  groceryValue:6  },
  { itemId:"gro_049", name:"Penne Pasta (16 oz)",            category:"pantry",    price:1.89,  unit:"each",  groceryValue:6  },
  { itemId:"gro_050", name:"Long-Grain White Rice (5 lb)",   category:"pantry",    price:6.99,  unit:"each",  groceryValue:12 },
  { itemId:"gro_051", name:"Canned Black Beans (15 oz)",     category:"pantry",    price:1.29,  unit:"each",  groceryValue:4  },
  { itemId:"gro_052", name:"Canned Chickpeas (15 oz)",       category:"pantry",    price:1.29,  unit:"each",  groceryValue:4  },
  { itemId:"gro_053", name:"Marinara Sauce, jar (24 oz)",    category:"pantry",    price:3.49,  unit:"each",  groceryValue:5  },
  { itemId:"gro_054", name:"Olive Oil (17 oz)",              category:"pantry",    price:9.99,  unit:"each",  groceryValue:4  },
  { itemId:"gro_055", name:"Peanut Butter (16 oz)",          category:"pantry",    price:4.49,  unit:"each",  groceryValue:5  },
  { itemId:"gro_056", name:"Strawberry Jam (18 oz)",         category:"pantry",    price:4.29,  unit:"each",  groceryValue:4  },
  { itemId:"gro_057", name:"Oatmeal, rolled (42 oz)",        category:"pantry",    price:5.99,  unit:"each",  groceryValue:9  },
  { itemId:"gro_058", name:"Cereal, Cheerios (12 oz)",       category:"pantry",    price:5.49,  unit:"each",  groceryValue:6  },
  { itemId:"gro_059", name:"Chicken Broth (32 oz carton)",   category:"pantry",    price:3.49,  unit:"each",  groceryValue:3  },
  { itemId:"gro_060", name:"Canned Tomatoes, diced (14 oz)", category:"pantry",    price:1.39,  unit:"each",  groceryValue:3  },
  { itemId:"gro_061", name:"All-Purpose Flour (5 lb)",       category:"pantry",    price:4.79,  unit:"each",  groceryValue:5  },
  { itemId:"gro_062", name:"Granulated Sugar (4 lb)",        category:"pantry",    price:4.49,  unit:"each",  groceryValue:4  },
  { itemId:"gro_063", name:"Salt, iodized (26 oz)",          category:"pantry",    price:1.29,  unit:"each",  groceryValue:2  },
  { itemId:"gro_064", name:"Black Pepper, ground (3 oz)",    category:"pantry",    price:3.99,  unit:"each",  groceryValue:2  },
  { itemId:"gro_065", name:"Ketchup (32 oz)",                category:"pantry",    price:3.49,  unit:"each",  groceryValue:2  },
  { itemId:"gro_066", name:"Soy Sauce (10 oz)",              category:"pantry",    price:2.99,  unit:"each",  groceryValue:2  },
  { itemId:"gro_067", name:"Hot Sauce, Tabasco (5 oz)",      category:"pantry",    price:3.79,  unit:"each",  groceryValue:1  },
  { itemId:"gro_068", name:"Honey (12 oz)",                  category:"pantry",    price:6.49,  unit:"each",  groceryValue:3  },

  // FROZEN
  { itemId:"gro_069", name:"Frozen Pizza (12 inch)",         category:"frozen",    price:7.99,  unit:"each",  groceryValue:8  },
  { itemId:"gro_070", name:"Frozen Chicken Nuggets (32 oz)", category:"frozen",    price:8.99,  unit:"each",  groceryValue:9  },
  { itemId:"gro_071", name:"Frozen Veggie Stir Fry (14 oz)",category:"frozen",    price:3.49,  unit:"each",  groceryValue:5  },
  { itemId:"gro_072", name:"Frozen Broccoli (12 oz)",        category:"frozen",    price:2.49,  unit:"each",  groceryValue:5  },
  { itemId:"gro_073", name:"Frozen Burritos (8-pack)",       category:"frozen",    price:8.49,  unit:"each",  groceryValue:9  },
  { itemId:"gro_074", name:"Ice Cream, vanilla (48 oz)",     category:"frozen",    price:6.99,  unit:"each",  groceryValue:4  },
  { itemId:"gro_075", name:"Frozen Waffles (10-count)",      category:"frozen",    price:4.49,  unit:"each",  groceryValue:5  },
  { itemId:"gro_076", name:"Frozen Fish Sticks (25 oz)",     category:"frozen",    price:7.49,  unit:"each",  groceryValue:8  },

  // BEVERAGES
  { itemId:"gro_077", name:"Coffee, ground (11.5 oz can)",   category:"beverages", price:8.99,  unit:"each",  groceryValue:5  },
  { itemId:"gro_078", name:"Orange Juice (52 oz)",           category:"beverages", price:5.99,  unit:"each",  groceryValue:5  },
  { itemId:"gro_079", name:"Apple Juice (64 oz)",            category:"beverages", price:4.49,  unit:"each",  groceryValue:5  },
  { itemId:"gro_080", name:"Sparkling Water, 12-pack",       category:"beverages", price:7.99,  unit:"each",  groceryValue:4  },
  { itemId:"gro_081", name:"Soda, 2-liter (Coke)",           category:"beverages", price:2.99,  unit:"each",  groceryValue:2  },
  { itemId:"gro_082", name:"Water, gallon (store brand)",    category:"beverages", price:1.29,  unit:"each",  groceryValue:3  },
  { itemId:"gro_083", name:"Tea Bags (20-count box)",        category:"beverages", price:3.99,  unit:"each",  groceryValue:4  },
  { itemId:"gro_084", name:"Sports Drink, 32 oz (Gatorade)", category:"beverages", price:2.29,  unit:"each",  groceryValue:2  },

  // SNACKS
  { itemId:"gro_085", name:"Potato Chips (8 oz bag)",        category:"snacks",    price:4.49,  unit:"each",  groceryValue:3  },
  { itemId:"gro_086", name:"Tortilla Chips (13 oz)",         category:"snacks",    price:4.99,  unit:"each",  groceryValue:3  },
  { itemId:"gro_087", name:"Salsa, medium jar (16 oz)",      category:"snacks",    price:3.99,  unit:"each",  groceryValue:2  },
  { itemId:"gro_088", name:"Hummus (10 oz)",                 category:"snacks",    price:4.29,  unit:"each",  groceryValue:3  },
  { itemId:"gro_089", name:"Mixed Nuts (10 oz)",             category:"snacks",    price:9.99,  unit:"each",  groceryValue:4  },
  { itemId:"gro_090", name:"Granola Bars (6-pack)",          category:"snacks",    price:4.99,  unit:"each",  groceryValue:4  },
  { itemId:"gro_091", name:"Crackers, Ritz (13.7 oz)",       category:"snacks",    price:4.49,  unit:"each",  groceryValue:4  },
  { itemId:"gro_092", name:"Popcorn, microwave (3-pack)",    category:"snacks",    price:3.49,  unit:"each",  groceryValue:3  },
  { itemId:"gro_093", name:"Chocolate Chip Cookies (13 oz)", category:"snacks",    price:4.99,  unit:"each",  groceryValue:3  },
  { itemId:"gro_094", name:"Pretzels (16 oz)",               category:"snacks",    price:3.99,  unit:"each",  groceryValue:3  },
  { itemId:"gro_095", name:"Ramen Noodles (3-pack)",         category:"snacks",    price:1.89,  unit:"each",  groceryValue:5  },

  // HOUSEHOLD
  { itemId:"gro_096", name:"Dish Soap (16 oz)",              category:"household", price:3.29,  unit:"each",  groceryValue:0  },
  { itemId:"gro_097", name:"Laundry Detergent (46 oz)",      category:"household", price:11.99, unit:"each",  groceryValue:0  },
  { itemId:"gro_098", name:"Paper Towels (6 rolls)",         category:"household", price:7.99,  unit:"each",  groceryValue:0  },
  { itemId:"gro_099", name:"Toilet Paper (12 rolls)",        category:"household", price:9.99,  unit:"each",  groceryValue:0  },
  { itemId:"gro_100", name:"Trash Bags, 13-gal (50-count)",  category:"household", price:12.99, unit:"each",  groceryValue:0  },
  { itemId:"gro_101", name:"Hand Soap, liquid (7.5 oz)",     category:"household", price:3.99,  unit:"each",  groceryValue:0  },
  { itemId:"gro_102", name:"All-Purpose Cleaner (32 oz)",    category:"household", price:4.49,  unit:"each",  groceryValue:0  },
  { itemId:"gro_103", name:"Sponges (3-pack)",               category:"household", price:3.49,  unit:"each",  groceryValue:0  },
  { itemId:"gro_104", name:"Aluminum Foil (50 sq ft)",       category:"household", price:4.99,  unit:"each",  groceryValue:0  },
  { itemId:"gro_105", name:"Plastic Wrap (100 sq ft)",       category:"household", price:3.99,  unit:"each",  groceryValue:0  },
];

// ============================================================
// SEED FUNCTION — call once from admin panel
// ============================================================
export async function seedDatabase() {
  console.log("🌱 Starting database seed...");

  // Seed apartments
  const aptBatch = writeBatch(db);
  for (const apt of APARTMENTS) {
    aptBatch.set(doc(db, "apartments", apt.aptId), apt);
  }
  await aptBatch.commit();
  console.log(`✅ Seeded ${APARTMENTS.length} apartment units`);

  // Seed groceries
  const groBatch = writeBatch(db);
  for (const item of GROCERY_ITEMS) {
    groBatch.set(doc(db, "groceries", item.itemId), item);
  }
  await groBatch.commit();
  console.log(`✅ Seeded ${GROCERY_ITEMS.length} grocery items`);

  // Set admin config
  await setDoc(doc(db, "admin", "config"), {
    gameActive:     true,
    adminUsername:  "metropolis_admin",
    adminPassword:  "change_me_in_firebase",
    classStartDay:  15,
    currentSeason:  "Spring 2026",
    totalStudents:  0,
    lastUpdated:    new Date().toISOString(),
  });
  console.log("✅ Admin config set");

  // Initialize empty event queue
  await setDoc(doc(db, "admin", "events"), { queue: [] });
  console.log("✅ Event queue initialized");

  console.log("🎉 Database seed complete!");
  return { apartments: APARTMENTS.length, groceries: GROCERY_ITEMS.length };
}
