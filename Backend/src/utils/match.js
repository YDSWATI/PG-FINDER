// ─────────────────────────────────────────────
// MATCH SCORE UTILITY
// src/utils/matchScore.js
// ─────────────────────────────────────────────

const SLEEP_ORDER = [
  "early_bird",
  "flexible",
  "night_owl",
];

const NOISE_ORDER = [
  "silent",
  "moderate",
  "social",
];

const CLEAN_ORDER = [
  "very_neat",
  "average",
  "relaxed",
];


// ─────────────────────────────────────────────
// Helper Function
// distance between two values in scale
// ─────────────────────────────────────────────
const getDistance = (arr, a, b) => {

  const indexA = arr.indexOf(a);
  const indexB = arr.indexOf(b);

  if (indexA === -1 || indexB === -1) {
    return 999;
  }

  return Math.abs(indexA - indexB);
};


// ─────────────────────────────────────────────
// MAIN MATCH FUNCTION
// ─────────────────────────────────────────────
const computeMatchScore = (userA, userB) => {

  const a = userA.habits || {};
  const b = userB.habits || {};

  let score = 0;

  const breakdown = {};



  // ─────────────────────────────────────────
  // 1. Sleep Time (30)
  // ─────────────────────────────────────────
  if (a.sleepTime && b.sleepTime) {

    const distance = getDistance(
      SLEEP_ORDER,
      a.sleepTime,
      b.sleepTime
    );

    if (distance === 0) {

      score += 30;

      breakdown.sleepTime = {
        points: 30,
        reason: "Same sleep schedule",
      };

    } else if (distance === 1) {

      score += 15;

      breakdown.sleepTime = {
        points: 15,
        reason: "Compatible sleep schedule",
      };

    } else {

      breakdown.sleepTime = {
        points: 0,
        reason: "Opposite sleep schedule",
      };
    }
  }



  // ─────────────────────────────────────────
  // 2. Food Preference (20)
  // ─────────────────────────────────────────
  if (a.foodPref && b.foodPref) {

    if (a.foodPref === b.foodPref) {

      score += 20;

      breakdown.foodPref = {
        points: 20,
        reason: "Same food preference",
      };

    }
    else if (
      a.foodPref === "no_preference" ||
      b.foodPref === "no_preference"
    ) {

      score += 10;

      breakdown.foodPref = {
        points: 10,
        reason: "One user is flexible with food",
      };

    } else {

      breakdown.foodPref = {
        points: 0,
        reason: "Different food preferences",
      };
    }
  }



  // ─────────────────────────────────────────
  // 3. Noise Level (20)
  // ─────────────────────────────────────────
  if (a.noiseLevel && b.noiseLevel) {

    const distance = getDistance(
      NOISE_ORDER,
      a.noiseLevel,
      b.noiseLevel
    );

    if (distance === 0) {

      score += 20;

      breakdown.noiseLevel = {
        points: 20,
        reason: "Same noise preference",
      };

    } else if (distance === 1) {

      score += 10;

      breakdown.noiseLevel = {
        points: 10,
        reason: "Similar noise preference",
      };

    } else {

      breakdown.noiseLevel = {
        points: 0,
        reason: "Very different noise preference",
      };
    }
  }



  // ─────────────────────────────────────────
  // 4. Cleanliness (15)
  // ─────────────────────────────────────────
  if (a.cleanliness && b.cleanliness) {

    const distance = getDistance(
      CLEAN_ORDER,
      a.cleanliness,
      b.cleanliness
    );

    if (distance === 0) {

      score += 15;

      breakdown.cleanliness = {
        points: 15,
        reason: "Same cleanliness level",
      };

    } else if (distance === 1) {

      score += 7;

      breakdown.cleanliness = {
        points: 7,
        reason: "Compatible cleanliness level",
      };

    } else {

      breakdown.cleanliness = {
        points: 0,
        reason: "Very different cleanliness level",
      };
    }
  }



  // ─────────────────────────────────────────
  // 5. Field (15)
  // ─────────────────────────────────────────
  if (a.field && b.field) {

    if (a.field === b.field) {

      score += 15;

      breakdown.field = {
        points: 15,
        reason: "Same field",
      };

    } else {

      breakdown.field = {
        points: 0,
        reason: "Different fields",
      };
    }
  }



  // ─────────────────────────────────────────
  // FINAL RESULT
  // ─────────────────────────────────────────
  return {
    score,
    percentage: score,
    compatible: score >= 60,
    breakdown,
  };
};


export { computeMatchScore };