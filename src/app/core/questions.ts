import { Question } from './models';

/**
 * All 200 questions of the Telangana Police SI Prelims 2022 paper.
 *
 * Each entry holds the question text, its four options, the correct option
 * (1-based: 1 means the first option), a short worked explanation shown on the
 * result screen, and for diagram questions the path of the figure image under
 * `public/figures`.
 *
 * Sections by question number:
 *   1-50    Arithmetic
 *   51-100  Reasoning & mental ability
 *   101-200 General studies & Telangana
 */
export const QUESTIONS: readonly Question[] = [
  {
    "number": 1,
    "text": "A person invested ₹X at 18% simple interest p.a. and ₹Y at 12% simple interest p.a. He received ₹4,320 interest at the end of the year. Had he interchanged the amounts, he would have received ₹4,680. Then |X − Y| =",
    "options": [
      "₹9,500",
      "₹8,000",
      "₹7,500",
      "₹6,000"
    ],
    "correctOption": 4,
    "explanation": "0.18X+0.12Y=4320 and 0.12X+0.18Y=4680. Subtracting: 0.06(X−Y)=−360, so |X−Y|=6000."
  },
  {
    "number": 2,
    "text": "The ratio of a principal and the total amount with r% simple interest on that principal after 1 year is a : b. Then r in terms of a, b is",
    "options": [
      "((b−a)/a)×100",
      "((b−a)/b)×100",
      "((b−a)/(b+a))×100",
      "((b+a)/(b−a))×100"
    ],
    "correctOption": 1,
    "explanation": "b/a = 1 + r/100, so r = (b−a)/a × 100."
  },
  {
    "number": 3,
    "text": "A person invested ₹18,000 at 20% compound interest per annum. The interest he gets after two years is",
    "options": [
      "₹7,920",
      "₹4,320",
      "₹6,750",
      "₹8,670"
    ],
    "correctOption": 1,
    "explanation": "18000 × (1.2² − 1) = 18000 × 0.44 = ₹7,920."
  },
  {
    "number": 4,
    "text": "A building of initial value ₹31,25,000 depreciates every year at 4% on its value at the beginning of the year. If ₹x is its value after 3 years and ₹y is the value of land (initially ₹32,00,000) appreciating at 5% compounded annually, then y − x =",
    "options": [
      "609700",
      "939600",
      "600000",
      "508900"
    ],
    "correctOption": 2,
    "explanation": "x = 31,25,000×0.96³ = 27,64,800; y = 32,00,000×1.05³ = 37,04,400; y−x = 9,39,600."
  },
  {
    "number": 5,
    "text": "If Tₙ = Tₙ₋₁ + Tₙ₋₂ for all n ≥ 3 and T₁ = T₂ = 1, then T₁ + T₂ + … + T₁₀ =",
    "options": [
      "T₁₁ + 4",
      "T₁₂ − 1",
      "T₁₂ + 1",
      "T₉ + T₁₁"
    ],
    "correctOption": 2,
    "explanation": "Sum of the first n Fibonacci terms = Tₙ₊₂ − 1. Check: sum = 143 = 144 − 1."
  },
  {
    "number": 6,
    "text": "Amount x is distributed among A, B, C. A gets 25% of x. Twice the difference of B and C equals A's share. The ratio A : B : C is",
    "options": [
      "26:72:59",
      "4:7:5",
      "8:13:9",
      "2:7:6"
    ],
    "correctOption": 2,
    "explanation": "A=25%, B−C=12.5%, B+C=75% → B=43.75%, C=31.25% → 4:7:5."
  },
  {
    "number": 7,
    "text": "Averages of data sets D₁, D₂, D₃ are 30, 40, 50. The combined average of D₁ and D₂ is 38, and of D₂ and D₃ is 42. The average of all three together is",
    "options": [
      "44.53",
      "42",
      "43.12",
      "40"
    ],
    "correctOption": 4,
    "explanation": "Sizes come out as 1 : 4 : 1. (30+160+50)/6 = 40."
  },
  {
    "number": 8,
    "text": "In a battalion of 600 police the average height is 150 cm. Later it was found that for x policemen heights were copied wrongly as 160 cm instead of 190 cm. With correct heights the average becomes 155 cm. Then x =",
    "options": [
      "120",
      "100",
      "180",
      "150"
    ],
    "correctOption": 2,
    "explanation": "Total rises by 600×5 = 3000 = 30x, so x = 100."
  },
  {
    "number": 9,
    "text": "The marked price of an article is 15% above its cost price. Later the marked price is decreased by 20%. If the cost price is ₹1,200, the shopkeeper's profit or loss at the current selling price is",
    "options": [
      "5% loss",
      "8% loss",
      "10% gain",
      "7% gain"
    ],
    "correctOption": 2,
    "explanation": "1.15 × 0.80 = 0.92 of cost → 8% loss."
  },
  {
    "number": 10,
    "text": "₹5,600 is distributed among 12 people (men, women, children). The totals given to all men, all women and all children are in ratio 9:4:1, while each man, woman and child individually get in ratio 3:2:1. The amount each woman gets is",
    "options": [
      "₹250",
      "₹300",
      "₹400",
      "₹450"
    ],
    "correctOption": 3,
    "explanation": "Totals 3600:1600:400. Head-counts ∝ 9/3:4/2:1/1 = 3:2:1 → 6 men, 4 women, 2 children. 1600/4 = ₹400."
  },
  {
    "number": 11,
    "text": "A shopkeeper sells at 30% profit on cost price. His weighing machine weighs 20% more than what it displays. His profit or loss is",
    "options": [
      "8⅓% profit",
      "10% profit",
      "10% loss",
      "8⅓% loss"
    ],
    "correctOption": 1,
    "explanation": "He gives 1.2 units for the price of 1 unit at 1.3: profit = 0.1/1.2 = 8⅓%."
  },
  {
    "number": 12,
    "text": "A shopkeeper gives 24% discount on marked price and incurs 5% loss. Without the discount his gain/loss would be",
    "options": [
      "20% gain",
      "29% loss",
      "25% gain",
      "21% loss"
    ],
    "correctOption": 3,
    "explanation": "0.76 MP = 0.95 CP → MP = 1.25 CP → 25% gain."
  },
  {
    "number": 13,
    "text": "A can do a work in 18 days and B in 12 days. They start together, B leaves after some days, and A finishes the rest in 3 days. B worked for",
    "options": [
      "5 days",
      "8 days",
      "4 days",
      "6 days"
    ],
    "correctOption": 4,
    "explanation": "A's last 3 days = 1/6. Remaining 5/6 at 5/36 per day = 6 days."
  },
  {
    "number": 14,
    "text": "14 men can do a work in 18 days; 15 women can do it in 24 days. 14 men work for the first 3 days and 10 women for the next 3 days. The ratio of time taken by 7 men alone to 5 women alone to finish the remaining work is",
    "options": [
      "2:3",
      "3:4",
      "1:3",
      "1:2"
    ],
    "correctOption": 4,
    "explanation": "Done: 1/6 + 1/12 = 1/4. Remaining 3/4 → 7 men: 27 days, 5 women: 54 days → 1:2."
  },
  {
    "number": 15,
    "text": "A alone can do a work in 10 days and B alone in 15 days. They agreed to do it for ₹30,000. With C's help they finished in 5 days. The amount to be paid to C is",
    "options": [
      "1/3 of B's amount",
      "Equal to B's amount",
      "1/2 of A's amount",
      "1/3 of A's amount"
    ],
    "correctOption": 4,
    "explanation": "In 5 days A does 1/2, B 1/3, C 1/6. C's share is 1/3 of A's."
  },
  {
    "number": 16,
    "text": "If a 22½% increase of a number is 98, then a 22½% decrease of that number is",
    "options": [
      "49",
      "53",
      "62",
      "45"
    ],
    "correctOption": 3,
    "explanation": "Number = 98/1.225 = 80; 80 × 0.775 = 62."
  },
  {
    "number": 17,
    "text": "A man started 10 minutes late, travelled at 1¼ times his usual speed and reached on time. His usual time (in minutes) is",
    "options": [
      "50",
      "60",
      "45",
      "75"
    ],
    "correctOption": 1,
    "explanation": "Time becomes 4/5 of usual; saving = T/5 = 10 → T = 50."
  },
  {
    "number": 18,
    "text": "P and Q start at 7 AM from A and B towards each other with speeds in ratio 4:5. They meet at C and spend some time together. From C at 8:07 AM, P goes towards B and Q towards A. If P reaches B at 9:12 AM, the time they spent together at C is",
    "options": [
      "12 min",
      "15 min",
      "17 min",
      "20 min"
    ],
    "correctOption": 2,
    "explanation": "If meeting time is t min after 7, CB = 5t units, P takes 5t/4 = 65 min → t = 52. They met at 7:52, so 15 min."
  },
  {
    "number": 19,
    "text": "The time between 7 and 8 o'clock when the minute hand is 5 minute-divisions behind the hour hand is",
    "options": [
      "30 2/11 min past 7",
      "32 8/11 min past 7",
      "43 7/11 min past 7",
      "34 3/11 min past 7"
    ],
    "correctOption": 2,
    "explanation": "35 + m/12 − m = 5 → m = 360/11 = 32 8/11."
  },
  {
    "number": 20,
    "text": "If m and n are the numbers of rotations of the hour hand and minute hand of a clock in 72 hours, then n − m =",
    "options": [
      "66",
      "72",
      "24",
      "56"
    ],
    "correctOption": 1,
    "explanation": "Hour hand: 6, minute hand: 72 → 66."
  },
  {
    "number": 21,
    "text": "X, Y and Z do a work. X and Y together completed 21/25 of it; Y and Z together 8/25. If they agreed for ₹3,250, X receives how much more than Z?",
    "options": [
      "2,210",
      "520",
      "1,690",
      "1,170"
    ],
    "correctOption": 3,
    "explanation": "X = 1 − 8/25 = 17/25, Z = 1 − 21/25 = 4/25. Difference 13/25 × 3250 = 1690."
  },
  {
    "number": 22,
    "text": "In 2022, 15 August is a Monday. The day of the week of Republic Day in 2024 is",
    "options": [
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday"
    ],
    "correctOption": 4,
    "explanation": "26 January 2024 fell on a Friday."
  },
  {
    "number": 23,
    "text": "P starts a business with ₹5,00,000. After 3 months Q joins with ₹4,00,000. At year end Q received ₹50,000 in total, including 20% of the profit for managing the business. The amount P received is",
    "options": [
      "₹45,000",
      "₹55,000",
      "₹60,000",
      "₹50,000"
    ],
    "correctOption": 4,
    "explanation": "Capital ratio 60:36 = 5:3. Q gets 0.2T + 0.8T×3/8 = 0.5T = 50,000 → T = 1,00,000. P = 0.8T×5/8 = ₹50,000."
  },
  {
    "number": 24,
    "text": "A, B, C start a business with ₹4,200, ₹8,400 and ₹5,400. They get ₹6,000 profit at year end and reinvest it in the same proportion. Next year's profit ratio is",
    "options": [
      "7:14:9",
      "8:11:17",
      "23:54:69",
      "29:56:36"
    ],
    "correctOption": 1,
    "explanation": "Reinvesting proportionally keeps the ratio 4200:8400:5400 = 7:14:9."
  },
  {
    "number": 25,
    "text": "A rectangular plot of 210 m × 120 m is divided into 4 equal parts by two 12 m wide roads through the middle, one parallel to each side. The area of each part (sq m) is",
    "options": [
      "10,692",
      "6,300",
      "3,816",
      "5,346"
    ],
    "correctOption": 4,
    "explanation": "(210−12)(120−12)/4 = 198×108/4 = 5,346."
  },
  {
    "number": 26,
    "text": "The side and diagonal of a square equal the diameters of two circles. The ratio of areas of the smaller to the larger circle is",
    "options": [
      "2:3",
      "1:3",
      "1:2",
      "2:5"
    ],
    "correctOption": 3,
    "explanation": "Diameters a and a√2 → areas 1:2."
  },
  {
    "number": 27,
    "text": "After 2022, the next calendar year exactly the same as 2022 is",
    "options": [
      "2032",
      "2033",
      "2026",
      "2028"
    ],
    "correctOption": 2,
    "explanation": "2022's calendar repeats in 2033."
  },
  {
    "number": 28,
    "text": "A solid cone is melted to make a sphere of volume 38,808 cm³. If their radii are equal, the height of the cone (cm) is",
    "options": [
      "42",
      "25",
      "84",
      "36"
    ],
    "correctOption": 3,
    "explanation": "r³ = 9261 → r = 21. ⅓πr²h = (4/3)πr³ → h = 4r = 84."
  },
  {
    "number": 29,
    "text": "Pipe A fills a tank in 30 min, B in 45 min; C empties a full tank in 15 min. A and B run for 15 min, then C is also opened. Time (min) to empty the tank from then is",
    "options": [
      "15",
      "45",
      "75",
      "90"
    ],
    "correctOption": 3,
    "explanation": "After 15 min: 15×(1/30+1/45) = 5/6 full. Net rate = 1/30+1/45−1/15 = −1/90 → (5/6)×90 = 75 min. (Some keys list 45; the arithmetic gives 75.)"
  },
  {
    "number": 30,
    "text": "Inlet pipes A and B together fill 72 units in 4 hours in a 160-unit tank. If A alone fills the tank in 20 hours, B alone fills it in",
    "options": [
      "25 hours",
      "15 hours",
      "21 hours",
      "16 hours"
    ],
    "correctOption": 4,
    "explanation": "A = 8 units/h, A+B = 18 → B = 10 units/h → 160/10 = 16 h."
  },
  {
    "number": 31,
    "text": "Two trains run on parallel tracks at 126 km/h and 108 km/h. In opposite directions they cross each other in 5 s. In the same direction, a passenger in the faster train sees the other train pass in 30 s. Length of the faster train (m) is",
    "options": [
      "150",
      "200",
      "175",
      "225"
    ],
    "correctOption": 3,
    "explanation": "Sum of lengths = 65 m/s × 5 = 325. Slower train = 5 m/s × 30 = 150. Faster = 175."
  },
  {
    "number": 32,
    "text": "A 450 m train moving at 65 km/h crosses a man in 27 s while he walks. His speed and direction are",
    "options": [
      "15 km/h, same",
      "15 km/h, opposite",
      "5 km/h, same",
      "5 km/h, opposite"
    ],
    "correctOption": 3,
    "explanation": "Relative speed = 450/27 m/s = 60 km/h < 65 → same direction, 5 km/h."
  },
  {
    "number": 33,
    "text": "Two cubes of 4,096 cc each are joined to form a cuboid. Difference between the total surface area of the two cubes and that of the cuboid (sq cm) is",
    "options": [
      "512",
      "256",
      "1,024",
      "1,536"
    ],
    "correctOption": 1,
    "explanation": "Side 16. Two cubes: 3072; cuboid 32×16×16: 2560. Difference 512."
  },
  {
    "number": 34,
    "text": "Adding 1 L of water to an acid-water mixture makes it 20% acid. Adding 1 L of acid to this new mixture makes it 33⅓% acid. The acid % in the original mixture is",
    "options": [
      "50",
      "22½",
      "25",
      "37½"
    ],
    "correctOption": 3,
    "explanation": "Acid a, water w: 5a = a+w+1 and 3(a+1) = a+w+2 → a=1, w=3 → 25%."
  },
  {
    "number": 35,
    "text": "A motor boat's speed in still water is 50 km/h. It travels 60 km against the stream in 1 h 30 min. Time to cover 100 km along the stream (minutes) is",
    "options": [
      "130",
      "110",
      "135",
      "100"
    ],
    "correctOption": 4,
    "explanation": "Upstream 40 → stream 10 → downstream 60 km/h → 100 min."
  },
  {
    "number": 36,
    "text": "A motor boat goes from A to B and back. Stream speed is 3 km/h, AB = 2 km and the round trip takes 30 minutes. Speed of the boat in still water is",
    "options": [
      "8 km/h",
      "10 km/h",
      "9 km/h",
      "6 km/h"
    ],
    "correctOption": 3,
    "explanation": "2/(x+3) + 2/(x−3) = 1/2 → x² − 8x − 9 = 0 → x = 9."
  },
  {
    "number": 37,
    "text": "In a 1200 m race A beats B by 120 m, and in an 800 m race B beats C by 40 m. In a 400 m race, A beats C by",
    "options": [
      "58 m",
      "42 m",
      "60 m",
      "54 m"
    ],
    "correctOption": 1,
    "explanation": "A:B = 10:9, B:C = 20:19 → A:C = 200:171. In 400 m C covers 342 → 58 m."
  },
  {
    "number": 38,
    "text": "Vessels A, B, C have syrup:water in ratios 2:3, 3:5 and 5:7. 15 L from A, 16 L from B and x L from C are mixed to get syrup:water 2:3. Then x =",
    "options": [
      "24",
      "20",
      "18",
      "17"
    ],
    "correctOption": 1,
    "explanation": "Syrup: 6 + 6 + 5x/12 = (2/5)(31 + x) → x = 24."
  },
  {
    "number": 39,
    "text": "A is twice as old as B. 15 years ago A was thrice as old as B. 25 years ago A's age was",
    "options": [
      "7 times B's",
      "6 times B's",
      "5 times B's",
      "4 times B's"
    ],
    "correctOption": 1,
    "explanation": "B = 30, A = 60. 25 years ago: 35 and 5 → 7 times."
  },
  {
    "number": 40,
    "text": "Ratio of Ram's and Rahim's ages 5 years from now is 11:10; 4 years ago it was 8:7. Ratio of present ages is",
    "options": [
      "19:17",
      "1:1",
      "28:25",
      "21:25"
    ],
    "correctOption": 3,
    "explanation": "Solving gives Ram 28, Rahim 25."
  },
  {
    "number": 41,
    "text": "Cost price of B is 25% more than that of A. A and B are marked up 30% and 20%. A is sold at 10% discount, B at 5% discount. If SP of A is ₹51 less than SP of B, the cost price of B is",
    "options": [
      "₹200",
      "₹250",
      "₹280",
      "₹300"
    ],
    "correctOption": 2,
    "explanation": "SP A = 1.17x, SP B = 1.425x. 0.255x = 51 → x = 200, B = 250."
  },
  {
    "number": 42,
    "text": "Cost price is 64% of marked price. If sold at 12% discount, profit % is",
    "options": [
      "48",
      "28.5",
      "37.5",
      "25"
    ],
    "correctOption": 3,
    "explanation": "0.88/0.64 = 1.375 → 37.5%."
  },
  {
    "number": 43,
    "text": "In a 1 km race A gives B 100 m and C 200 m start. B can give C 20 min over a 200 m race. The time B takes to run 200 m is",
    "options": [
      "10/4 min",
      "1/4 min",
      "90/4 min",
      "25/4 min"
    ],
    "correctOption": 3,
    "explanation": "Official key answer: 90/4 min. (Question wording is ambiguous in the source.)"
  },
  {
    "number": 44,
    "text": "A 25-digit number has equal extreme digits and the other 23 digits equal to each other but different from the extremes. If it is divisible by 11, the end digit can't be",
    "options": [
      "9",
      "8",
      "5",
      "4"
    ],
    "correctOption": 3,
    "explanation": "Alternating-sum test gives 2d − e ≡ 0 (mod 11). d=9→e=7, d=8→e=5, d=4→e=8 work; d=5 needs e=10, impossible."
  },
  {
    "number": 45,
    "text": "G is the GCD of 3,780, 3,465 and 3,003; L is the LCM of 3,465 and 3,003. Then L/(33G) =",
    "options": [
      "65",
      "780",
      "455",
      "429"
    ],
    "correctOption": 1,
    "explanation": "G = 21, L = 45,045 → 45045/693 = 65."
  },
  {
    "number": 46,
    "text": "If x = 12⅓ + 10⅚ and y = 7⅔ + 1 4/7, then x − y =",
    "options": [
      "14¼",
      "13 13/14",
      "13 11/14",
      "14 3/14"
    ],
    "correctOption": 2,
    "explanation": "x = 23 1/6, y = 9 5/21 → x − y = 13 39/42 = 13 13/14."
  },
  {
    "number": 47,
    "text": "If x is the units digit of the square of an integer, the sum of all possible distinct values of x is",
    "options": [
      "25",
      "27",
      "28",
      "32"
    ],
    "correctOption": 1,
    "explanation": "Possible digits 0,1,4,5,6,9 → 25."
  },
  {
    "number": 48,
    "text": "(∛−2197 × ∛−125 ÷ ∛(27/512)) + 2/3 =",
    "options": [
      "174",
      "∛131",
      "7/3",
      "12∛3"
    ],
    "correctOption": 1,
    "explanation": "(−13)(−5) ÷ (3/8) = 520/3; + 2/3 = 174."
  },
  {
    "number": 49,
    "text": "If x is an integer satisfying 9x^(2/3) + 9x^(−2/3) = 82, then √(12 + 2√x) =",
    "options": [
      "1+√11",
      "3+√3",
      "√3+√5",
      "2+√8"
    ],
    "correctOption": 2,
    "explanation": "x^(2/3) = 9 → x = 27. √(12+6√3) = 3+√3."
  },
  {
    "number": 50,
    "text": "The set of all perfect numbers and twin primes among 1–9 is",
    "options": [
      "{1,2,3,4,5,7,9}",
      "{1,3,4,5,7,9}",
      "{3,4,5,7,9}",
      "{3,5,6,7}"
    ],
    "correctOption": 4,
    "explanation": "Perfect: 6. Twin primes: 3, 5, 7."
  },
  {
    "number": 51,
    "text": "Identify the Venn diagram that best represents: triangles, equilateral triangles, right-angled triangles, isosceles triangles.",
    "options": [
      "Diagram (1)",
      "Diagram (2)",
      "Diagram (3)",
      "Diagram (4)"
    ],
    "correctOption": 2,
    "explanation": "Equilateral ⊂ isosceles, and isosceles overlaps right-angled (the 45-45-90 triangle), all inside triangles: diagram (2). (A candidate's paper had (3) marked.)",
    "figureImagePath": "figures/q51.jpg"
  },
  {
    "number": 52,
    "text": "A ranks 13th from the top and B 17th from the bottom. C is 5 ranks below A and 5 ranks above B. Number of students is",
    "options": [
      "39",
      "29",
      "19",
      "30"
    ],
    "correctOption": 1,
    "explanation": "C is 18th from top and 22nd from bottom → 18+22−1 = 39."
  },
  {
    "number": 53,
    "text": "Triangle = Cricket, circle = Football, rectangle = Hockey, rhombus = Tennis. The difference between players who play all games except Hockey and players who play all four games equals",
    "options": [
      "All games except Tennis",
      "Only Tennis",
      "Only Hockey",
      "All games except Football"
    ],
    "correctOption": 4,
    "explanation": "All except Hockey = 5, all four = 2 → 3, which equals all except Football (3).",
    "figureImagePath": "figures/q53.jpg"
  },
  {
    "number": 54,
    "text": "A, B, C, D, E, F sit around a circular table. A and F face the centre; the rest face outward. D is second to the left of B. F is second to the right of A. Only one person sits between B and C. Who sits to the immediate right of F?",
    "options": [
      "D",
      "B",
      "A",
      "C"
    ],
    "correctOption": 1,
    "explanation": "Official key: D."
  },
  {
    "number": 55,
    "text": "5 persons A–E sit at the corners and centre of a square garden. A is adjacent to C; B, E, D are not on a line; A and D are equidistant from C; A, E, D are not on a line. Persons at the corners are",
    "options": [
      "A, C, D, E",
      "A, B, C, D",
      "B, C, D, E",
      "B, A, D, E"
    ],
    "correctOption": 1,
    "explanation": "Official key: A, C, D, E (B at centre)."
  },
  {
    "number": 56,
    "text": "A walks 500 m from his house, turns left and walks 1 km, then turns right and walks 1½ km to his office, which is north-east of his house. His initial direction and the shortest distance are",
    "options": [
      "South-East, 2 km",
      "North, 2 km",
      "East, √5 km",
      "West, √5 km"
    ],
    "correctOption": 3,
    "explanation": "Start East: net 2 km E, 1 km N → north-east, distance √5 km."
  },
  {
    "number": 57,
    "text": "Six students S₁–S₆; total marks 1000. S₃ > S₄ but S₃ < S₂. S₆ is lowest (60), highest is 400. S₁ got 400, S₅ is 2nd from last, average of last 3 is 95. Total of S₂ and S₃ is",
    "options": [
      "225",
      "185",
      "315",
      "200"
    ],
    "correctOption": 3,
    "explanation": "Order S₁,S₂,S₃,S₄,S₅,S₆. Last three = 285 → S₂+S₃ = 1000−400−285 = 315."
  },
  {
    "number": 58,
    "text": "Statement: Should there be blended learning in the education system? I. Yes, it lets students work at their own pace. II. No, gadgets and social media distract students.",
    "options": [
      "Only I is strong",
      "Only II is strong",
      "Both are strong",
      "Both are weak"
    ],
    "correctOption": 1,
    "explanation": "I addresses the core benefit; II is a side issue about gadgets, not about blended learning itself."
  },
  {
    "number": 59,
    "text": "Statement: Should there be a high level of violence in films in the name of entertainment? I. No, it causes behavioural changes, especially in children and youth. II. Yes, when the story demands, filmmakers have no option.",
    "options": [
      "Only I is strong",
      "Only II is strong",
      "Both are strong",
      "Both are weak"
    ],
    "correctOption": 1,
    "explanation": "I gives a real consequence; II is a weak excuse."
  },
  {
    "number": 60,
    "text": "A person facing West walks 30 m West, then 80 m North, then 30 m West. Distance from start is",
    "options": [
      "90 m",
      "85 m",
      "100 m",
      "105 m"
    ],
    "correctOption": 3,
    "explanation": "60 m West, 80 m North → 100 m."
  },
  {
    "number": 61,
    "text": "Statement: A hall ticket says 'Every candidate has to be in the hall before the exam commences; not even 1 minute late is allowed.' Assumptions: I. If not mentioned, candidates may come any time. II. Every candidate should get an equal chance to filter meritorious students.",
    "options": [
      "Only I",
      "Only II",
      "Both",
      "Neither"
    ],
    "correctOption": 1,
    "explanation": "The instruction exists because, without it, candidates might come late (I)."
  },
  {
    "number": 62,
    "text": "Statement: The national education policy brings major changes in the education system. Assumptions: I. The present system is not supporting the needs of the nation. II. The present system is teacher-centric.",
    "options": [
      "Only I",
      "Only II",
      "Both",
      "Neither"
    ],
    "correctOption": 1,
    "explanation": "Major change implies the current system falls short (I). Nothing implies II."
  },
  {
    "number": 63,
    "text": "Statement: A Prime Minister said, 'Wastage of anything is crime. Wastage of food is double crime.' Conclusions: I. Food wastage is of high importance to fight hunger and improve food security. II. Food wastage is morally wrong because many are hungry.",
    "options": [
      "Only I",
      "Only II",
      "Both",
      "Neither"
    ],
    "correctOption": 3,
    "explanation": "Both follow from calling food wastage a 'double crime'."
  },
  {
    "number": 64,
    "text": "Statement: 'Marriages are made in Heaven.' Conclusions: I. A divine power ultimately decides who marries whom. II. Marriages are made in heaven before the couple meet on earth.",
    "options": [
      "Only I",
      "Only II",
      "Both",
      "Neither"
    ],
    "correctOption": 1,
    "explanation": "I captures the meaning; II takes it literally."
  },
  {
    "number": 65,
    "text": "Is the product xy irrational? I: x is irrational. II: y is irrational.",
    "options": [
      "I alone",
      "II alone",
      "I and II together",
      "Both together not sufficient"
    ],
    "correctOption": 4,
    "explanation": "√2 × √2 = 2 is rational, √2 × √3 is not → cannot decide."
  },
  {
    "number": 66,
    "text": "What is the perimeter of the circle? I. The centre (0,0) is 5 units from P(3,4). II. The images of P in the x- and y-axes lie on the circle.",
    "options": [
      "I alone",
      "II alone",
      "I and II together",
      "Both together not sufficient"
    ],
    "correctOption": 1,
    "explanation": "Official key: (1)."
  },
  {
    "number": 67,
    "text": "Manager conditions: (a) graduate with ≥60%, (b) under 30 on 1 July 2022, (c) ≥50% in X class, (d) diploma/degree/PG in management, (e) ≥1 yr experience. Unknown info → refer to CEO. Mr X: born 15 Aug 1995, graduate + PG in management, 1½ yrs experience, 75% marks from XI standard onwards. Mr X",
    "options": [
      "Can be recruited",
      "Cannot be recruited – one condition fails",
      "Cannot be recruited – lacks 2 years experience",
      "Will be referred to CEO"
    ],
    "correctOption": 4,
    "explanation": "His X class marks are not given, so the case goes to the CEO. (The marked paper shows (1).)"
  },
  {
    "number": 68,
    "text": "Same conditions. Mr Y was a 1st-class student throughout, completed his 25th birthday on 2 Sep 2017, worked as assistant manager from 1 July 2018 to 3 Aug 2019 and has a management diploma from IIM. Mr Y",
    "options": [
      "Can be appointed",
      "Cannot – over 30",
      "Cannot – lacks 2 years experience",
      "Referred to CEO"
    ],
    "correctOption": 1,
    "explanation": "Age 29 on 1 July 2022, first class, >1 yr experience, diploma — all met."
  },
  {
    "number": 69,
    "text": "Family of 8: D is grandson of F. G is son-in-law of C. F is mother of B. A is wife of B. H is daughter of C and mother of D. E is daughter of A. Who is the father of D?",
    "options": [
      "C",
      "B",
      "D",
      "G"
    ],
    "correctOption": 4,
    "explanation": "H is D's mother and G is C's son-in-law (H's husband) → G."
  },
  {
    "number": 70,
    "text": "Assertion: Antibiotics do not treat Corona infection. Reason: Corona is a virus, not a bacterium.",
    "options": [
      "Both true, R explains A",
      "Both true, R doesn't explain A",
      "A true, R false",
      "A false, R true"
    ],
    "correctOption": 1,
    "explanation": "Antibiotics act on bacteria only."
  },
  {
    "number": 71,
    "text": "Six persons P₁–P₆ live one on each floor (1–6, bottom to top). P₃ is immediately below P₁. P₅ is immediately below P₄. Three people live between P₆ and P₅. P₂ is not on top. P₁ is not below P₄. P₅ and P₆ are on even floors. P₁ and P₂ live on floors",
    "options": [
      "5 & 1",
      "3 & 5",
      "2 & 5",
      "4 & 5"
    ],
    "correctOption": 1,
    "explanation": "P₅=2, P₆=6, P₄=3, P₁=5, P₃=4, P₂=1."
  },
  {
    "number": 72,
    "text": "I: Prices of petrol products increased substantially in recent months in India. II: Prices of many goods in India are increasing nowadays.",
    "options": [
      "I is cause, II is effect",
      "II is cause, I is effect",
      "Effects of independent causes",
      "Independent causes"
    ],
    "correctOption": 1,
    "explanation": "Fuel prices raise transport costs, pushing up prices of goods. (The marked paper shows (3).)"
  },
  {
    "number": 73,
    "text": "If letters are coded 1–26 from Z to A (Z=1 … A=26), which option hides a meaningful word?",
    "options": [
      "3-18-22-14-11-15",
      "11-12-15-23-8-26",
      "22-7-9-14-12-25",
      "8-18-14-11-15-22"
    ],
    "correctOption": 4,
    "explanation": "Letter = 27 − n: 8-18-14-11-15-22 → S-I-M-P-L-E."
  },
  {
    "number": 74,
    "text": "Assertion: Knee pain is common nowadays; knee replacement is a boon for sufferers. Reason: Necessity is the mother of invention.",
    "options": [
      "Both true, R explains A",
      "Both true, R doesn't explain A",
      "A true, R false",
      "A false, R true"
    ],
    "correctOption": 1,
    "explanation": "Official key: (1)."
  },
  {
    "number": 75,
    "text": "'Mathematics improves Reasoning' = 'du mu vu'; 'Reasoning improves logical thinking' = 'vu lu du ya'; 'Logical thinking improves common sense' = 'ma ya du lu ta'. 'Mathematics improves logical thinking' =",
    "options": [
      "vu lu mu ya",
      "ta ya mu lu",
      "du mu ya lu",
      "mu ya du vu"
    ],
    "correctOption": 3,
    "explanation": "improves=du, Reasoning=vu, Mathematics=mu, logical thinking=lu ya."
  },
  {
    "number": 76,
    "text": "'Write exam well' = 'lm rs ek'; 'All is well' = 'ek jp pm'; 'Exam is easy' = 'rs jp wk'. 'All write exam well' =",
    "options": [
      "ek rs jp pm",
      "ek rs lm pm",
      "wk jp rs pm",
      "ek rs jp wk"
    ],
    "correctOption": 2,
    "explanation": "well=ek, exam=rs, is=jp, write=lm, all=pm."
  },
  {
    "number": 77,
    "text": "Complete the series: CX, FU, ___, LO",
    "options": [
      "HS",
      "JR",
      "IQ",
      "IR"
    ],
    "correctOption": 4,
    "explanation": "First letter +3 (C,F,I,L), second −3 (X,U,R,O)."
  },
  {
    "number": 78,
    "text": "kth letter coded as: (k+17)th for 1≤k≤9; (k−1)th for 10≤k≤18; (k−18)th for 19≤k≤26. The word coded as GAURD is",
    "options": [
      "YRCQU",
      "YSDAV",
      "XRDPV",
      "YSDNA"
    ],
    "correctOption": 2,
    "explanation": "Decode: G←Y, A←S, U←D, R←A, D←V."
  },
  {
    "number": 79,
    "text": "B3E, C5G, E7K, G11M, ?",
    "options": [
      "M15Q",
      "K13O",
      "K13Q",
      "K15S"
    ],
    "correctOption": 3,
    "explanation": "Prime positions: letters B,C,E,G,K; numbers 3,5,7,11,13; last letters E,G,K,M,Q."
  },
  {
    "number": 80,
    "text": "Z _ T _ N K H _ B — choose the missing letters",
    "options": [
      "X, R, E",
      "W, R, E",
      "W, Q, E",
      "X, Q, E"
    ],
    "correctOption": 3,
    "explanation": "Step −3: Z W T Q N K H E B."
  },
  {
    "number": 81,
    "text": "Pointing to a man, A said, 'His daughter's mother is the daughter-in-law of my father.' How is A related to the man?",
    "options": [
      "Sister-in-law",
      "Brother-in-law",
      "Spouse",
      "Sibling"
    ],
    "correctOption": 4,
    "explanation": "The man's wife is A's father's daughter-in-law → the man is A's father's son → sibling."
  },
  {
    "number": 82,
    "text": "A is the only daughter of B. C is husband of B. D is father of C. E is wife of D. A is related to E as",
    "options": [
      "Grandson",
      "Daughter-in-law",
      "Uncle",
      "Granddaughter"
    ],
    "correctOption": 4,
    "explanation": "E is A's paternal grandmother."
  },
  {
    "number": 83,
    "text": "If B means '+', D means '×', Q means '÷' and R means '−', then 432 Q 18 R 24 B 2 D 3 = (digits partly hidden by watermark in source)",
    "options": [
      "22",
      "6",
      "12",
      "17"
    ],
    "correctOption": 2,
    "explanation": "432÷18 − 24 + 2×3 = 24 − 24 + 6 = 6."
  },
  {
    "number": 84,
    "text": "Symbols ≮, ≠, ≯, >, <, = are A, B, C, D, E, F respectively. Given PAQ, QFR and SER, the correct implications are",
    "options": [
      "PDS, RCP",
      "PES, RBF",
      "RBQ, PFS",
      "PAS, PCR"
    ],
    "correctOption": 1,
    "explanation": "P ≥ Q = R > S → P > S (PDS) and R ≯ P (RCP)."
  },
  {
    "number": 85,
    "text": "1/2, 8/5, 27/10, 64/17, ___, 216/37",
    "options": [
      "125/26",
      "81/23",
      "125/3",
      "121/36"
    ],
    "correctOption": 1,
    "explanation": "n³/(n²+1)."
  },
  {
    "number": 86,
    "text": "Stag : Hind :: Ram : ?",
    "options": [
      "Ewe",
      "Hart",
      "Earl",
      "Heifer"
    ],
    "correctOption": 1,
    "explanation": "Male : female deer :: male : female sheep."
  },
  {
    "number": 87,
    "text": "OPQ : PRT :: FGH : ?",
    "options": [
      "GIR",
      "GIL",
      "GIK",
      "EDC"
    ],
    "correctOption": 3,
    "explanation": "+1, +2, +3."
  },
  {
    "number": 88,
    "text": "444 : 21 :: 964 : ?",
    "options": [
      "31",
      "41",
      "24",
      "29"
    ],
    "correctOption": 1,
    "explanation": "Official key: 31."
  },
  {
    "number": 89,
    "text": "Choose the odd pair",
    "options": [
      "Short : Long",
      "Light : Heavy",
      "Crime : Blame",
      "Poor : Rich"
    ],
    "correctOption": 3,
    "explanation": "The others are opposites."
  },
  {
    "number": 90,
    "text": "Among 131, 151, 161, 181, 191, the odd one is",
    "options": [
      "131",
      "181",
      "161",
      "191"
    ],
    "correctOption": 3,
    "explanation": "161 = 7 × 23; the rest are prime."
  },
  {
    "number": 91,
    "text": "Choose the odd one out",
    "options": [
      "V21T",
      "N14L",
      "I8G",
      "E4C"
    ],
    "correctOption": 2,
    "explanation": "Pattern: letter, (its position − 1), letter two places back. N14L breaks it (should be N13L)."
  },
  {
    "number": 92,
    "text": "Choose the odd one out",
    "options": [
      "Earth",
      "Water",
      "Fire",
      "Environment"
    ],
    "correctOption": 4,
    "explanation": "Earth, Water, Fire are elements (pancha bhutas)."
  },
  {
    "number": 93,
    "text": "11:121:110 :: 15:225:210 :: ?",
    "options": [
      "9:81:70",
      "19:361:342",
      "17:288:272",
      "16:225:239"
    ],
    "correctOption": 2,
    "explanation": "n : n² : n² − n."
  },
  {
    "number": 94,
    "text": "A cuboid 81 cm × 27 cm × 9 cm is cut into 729 identical cubes. The edge of each cube is",
    "options": [
      "1 cm",
      "3 cm",
      "9 cm",
      "27 cm"
    ],
    "correctOption": 2,
    "explanation": "Volume 19,683 / 729 = 27 cm³ → edge 3 cm."
  },
  {
    "number": 95,
    "text": "A 4-inch cube is painted red, green and yellow, each colour on a pair of opposite faces, then cut into 1-inch cubes. Cubes with only one face painted red =",
    "options": [
      "16",
      "24",
      "8",
      "32"
    ],
    "correctOption": 3,
    "explanation": "Each red face has (4−2)² = 4 such cubes → 8."
  },
  {
    "number": 96,
    "text": "Select the pair that has a relationship similar to pair (A).",
    "options": [
      "(1)",
      "(2)",
      "(3)",
      "(4)"
    ],
    "correctOption": 3,
    "explanation": "Outer and inner shapes swap, and the polygon gains one side.",
    "figureImagePath": "figures/q96.jpg"
  },
  {
    "number": 97,
    "text": "All faces of a cube are labelled I–VI. From the three positions shown, the face opposite I is",
    "options": [
      "VI",
      "IV",
      "II",
      "V"
    ],
    "correctOption": 1,
    "explanation": "I is adjacent to II, IV, III, V → opposite is VI.",
    "figureImagePath": "figures/q97.jpg"
  },
  {
    "number": 98,
    "text": "One part of figure (A) is missing. Choose the missing part.",
    "options": [
      "(1)",
      "(2)",
      "(3)",
      "(4)"
    ],
    "correctOption": 3,
    "explanation": "Option (3) completes the arcs and diagonals.",
    "figureImagePath": "figures/q98.jpg"
  },
  {
    "number": 99,
    "text": "The total number of squares in the figure is",
    "options": [
      "32",
      "42",
      "35",
      "45"
    ],
    "correctOption": 3,
    "explanation": "Key answer: 35.",
    "figureImagePath": "figures/q99.jpg"
  },
  {
    "number": 100,
    "text": "A mirror is placed on line MN. Which option shows the correct image?",
    "options": [
      "(1)",
      "(2)",
      "(3)",
      "(4)"
    ],
    "correctOption": 4,
    "explanation": "A vertical mirror flips the figure left-to-right.",
    "figureImagePath": "figures/q100.jpg"
  },
  {
    "number": 101,
    "text": "___ is expected to host the Shanghai Cooperation Organisation summit in 2023.",
    "options": [
      "China",
      "India",
      "Kazakhstan",
      "Russia"
    ],
    "correctOption": 2,
    "explanation": "India chaired the SCO in 2023."
  },
  {
    "number": 102,
    "text": "The Election Commission announced polls for ___ Rajya Sabha seats falling vacant between June and August 2022.",
    "options": [
      "47",
      "52",
      "57",
      "62"
    ],
    "correctOption": 3,
    "explanation": "57 seats across 15 states."
  },
  {
    "number": 103,
    "text": "___ measures output in sectors like electricity, mining and manufacturing.",
    "options": [
      "Gross domestic product",
      "Index of industrial production",
      "Current account balance",
      "Fiscal surplus/deficit"
    ],
    "correctOption": 2,
    "explanation": "IIP."
  },
  {
    "number": 104,
    "text": "As Ford exits India, its Gujarat (Sanand) manufacturing unit has been taken over by",
    "options": [
      "Mahindra",
      "Suzuki",
      "Tata",
      "Hyundai"
    ],
    "correctOption": 3,
    "explanation": "Tata Passenger Electric Mobility."
  },
  {
    "number": 105,
    "text": "The ILO directed there should be no barriers to people with different sexual orientations. They should be described as",
    "options": [
      "LGBTIQ people",
      "Hijras",
      "Gay people",
      "Transgenders"
    ],
    "correctOption": 1,
    "explanation": ""
  },
  {
    "number": 106,
    "text": "The Indian Army plans to create an integrated battle group combining strike formation on the northern border and",
    "options": [
      "Hold formation on western border",
      "Push formation on northern border",
      "Hold formation on northern border",
      "Strike formation on western border"
    ],
    "correctOption": 4,
    "explanation": "Official key: (4)."
  },
  {
    "number": 107,
    "text": "The Southwest monsoon sets in first in",
    "options": [
      "Tamil Nadu",
      "Kerala",
      "Karnataka",
      "Maharashtra"
    ],
    "correctOption": 2,
    "explanation": ""
  },
  {
    "number": 108,
    "text": "The Supreme Court suspended ___ covering sedition",
    "options": [
      "Section 120(B) IPC",
      "Section 124(A) IPC",
      "Section 128 IPC",
      "Section 132 IPC"
    ],
    "correctOption": 2,
    "explanation": "May 2022 order."
  },
  {
    "number": 109,
    "text": "TSRTC filed a ___ case against Rapido over an advertisement",
    "options": [
      "Defamation",
      "Copyright",
      "Cheating",
      "Conspiracy"
    ],
    "correctOption": 1,
    "explanation": ""
  },
  {
    "number": 110,
    "text": "Russia overtook which country to become India's second-biggest oil supplier?",
    "options": [
      "Qatar",
      "Iran",
      "Saudi Arabia",
      "Ukraine"
    ],
    "correctOption": 3,
    "explanation": ""
  },
  {
    "number": 111,
    "text": "Which country became the 4th new member of the New Development Bank in 2021?",
    "options": [
      "Bangladesh",
      "Myanmar",
      "Uruguay",
      "Egypt"
    ],
    "correctOption": 4,
    "explanation": "Bangladesh, UAE, Uruguay, then Egypt."
  },
  {
    "number": 112,
    "text": "The Human Development Index indicates",
    "options": [
      "Income, Health, Education",
      "Income, Health, Trade",
      "Health, Education, Nutrition",
      "Income, Health, Imports"
    ],
    "correctOption": 1,
    "explanation": ""
  },
  {
    "number": 113,
    "text": "Cyclone Asani (May 2022) affected",
    "options": [
      "Andhra Pradesh",
      "Tamil Nadu",
      "Kerala",
      "Karnataka"
    ],
    "correctOption": 1,
    "explanation": ""
  },
  {
    "number": 114,
    "text": "All countries of the ___ continent are members of G-77.",
    "options": [
      "Africa",
      "Asia",
      "Europe",
      "South America"
    ],
    "correctOption": 1,
    "explanation": ""
  },
  {
    "number": 115,
    "text": "Thomson Reuters is",
    "options": [
      "Canada based",
      "UK based",
      "USA based",
      "Australia based"
    ],
    "correctOption": 1,
    "explanation": "Headquartered in Toronto."
  },
  {
    "number": 116,
    "text": "Kruger National Park is in",
    "options": [
      "Greece",
      "Russia",
      "South Africa",
      "Singapore"
    ],
    "correctOption": 3,
    "explanation": ""
  },
  {
    "number": 117,
    "text": "Match Kingdom with Ruler: (a) Vatsa (b) Avanti (c) Kosala (d) Chedi — (i) Udayana (ii) Prasenajit (iii) Shishupala (iv) Pradyota",
    "options": [
      "i, ii, iii, iv",
      "i, iv, ii, iii",
      "i, iii, iv, ii",
      "i, ii, iv, iii"
    ],
    "correctOption": 2,
    "explanation": "Vatsa–Udayana, Avanti–Pradyota, Kosala–Prasenajit, Chedi–Shishupala."
  },
  {
    "number": 118,
    "text": "Expansion of NASA",
    "options": [
      "National Agency of Space Administration",
      "National Aeronautics and Space Administration",
      "National Air and Space Agency",
      "Navigational, Aeronautical & Space Agency"
    ],
    "correctOption": 2,
    "explanation": ""
  },
  {
    "number": 119,
    "text": "Which statement is NOT correct about Ashoka and the Mauryas?",
    "options": [
      "Dhamma-Mahamatras were created to spread Dhamma",
      "Pradeshika, Rajuka, Yukta were district officers",
      "Pativedaka and Pulisani maintained the treasury and accounts",
      "Dipavamsa/Mahavamsa say Ashoka killed 99 brothers"
    ],
    "correctOption": 3,
    "explanation": "Pativedakas were reporters and Pulisanis public-relations officers, not treasury officials."
  },
  {
    "number": 120,
    "text": "Who composed the Mandasor inscription?",
    "options": [
      "Vatsabhatti",
      "Chitradatta",
      "Parnadatta",
      "Chakrapalita"
    ],
    "correctOption": 1,
    "explanation": ""
  },
  {
    "number": 121,
    "text": "Which statement is NOT correct about Jainism?",
    "options": [
      "Neminatha, the 22nd Tirthankara, led the Jaina order at the time of the Mahabharata war",
      "Jaina monks were found on the Indus banks during Alexander's invasion",
      "The Gomateshwara statue at Shravanabelagola was erected by Chamundaraya, king of the Gangas, in the 11th century",
      "Mahavira preached in Ardha-Magadhi; teachings compiled in 12 Angas"
    ],
    "correctOption": 3,
    "explanation": "It was erected c. 983 AD (10th century) by Chamundaraya, a minister, not king."
  },
  {
    "number": 122,
    "text": "Assertion: Balban could not raise the army to the size reached under Alauddin Khalji. Reason: Balban insisted on high birth for higher civil and military posts.",
    "options": [
      "Both true, R explains A",
      "Both true, R doesn't explain A",
      "A true, R false",
      "A false, R true"
    ],
    "correctOption": 1,
    "explanation": "Official key: (1)."
  },
  {
    "number": 123,
    "text": "Match texts with authors: (a) Kumarapalacharita (b) Vikramankadevacharita (c) Rajatarangini (d) Prithviraj Raso — (i) Chand Bardai (ii) Kalhana (iii) Bilhana (iv) Hemachandra",
    "options": [
      "i, ii, iii, iv",
      "ii, i, iv, iii",
      "iv, iii, ii, i",
      "iii, iv, ii, i"
    ],
    "correctOption": 3,
    "explanation": ""
  },
  {
    "number": 124,
    "text": "Match dynasties with kingdoms: (a) Nizam Shahi (b) Imad Shahi (c) Adil Shahi (d) Qutb Shahi (e) Barid Shahi — (i) Bidar (ii) Golconda (iii) Berar (iv) Ahmednagar (v) Bijapur",
    "options": [
      "iii, i, iv, ii, v",
      "i, iii, iv, ii, v",
      "v, iv, iii, ii, i",
      "iv, iii, v, ii, i"
    ],
    "correctOption": 4,
    "explanation": ""
  },
  {
    "number": 125,
    "text": "Which statement is NOT correct about the Bahmani kingdom?",
    "options": [
      "Founded by Alauddin Hasan Bahman Shah in 1327 AD",
      "Shihab-ud-din Mahmud had the longest rule",
      "Mahmud Gawan was PM under Muhammad Shah III",
      "Kalimullah Shah was the last ruler"
    ],
    "correctOption": 1,
    "explanation": "It was founded in 1347."
  },
  {
    "number": 126,
    "text": "Name the Afghan who helped form the Rajput confederacy against Babur at Khanwa (1527).",
    "options": [
      "Alam Khan of Kalpi",
      "Hasan Khan Mewati",
      "Nizam Khan of Bayana",
      "Tatar Khan Sarangkhan of Gwalior"
    ],
    "correctOption": 2,
    "explanation": ""
  },
  {
    "number": 127,
    "text": "Which statement is NOT correct about Shivaji's coronation?",
    "options": [
      "Conducted by Vishweshwar (Gaga Bhatta) of Benaras",
      "Balam Bhatta was a family priest",
      "On 10 June 1674 Shivaji re-married his four surviving wives by Kshatriya rites",
      "A second coronation was held on the suggestion of tantric Nischal Puri Goswami"
    ],
    "correctOption": 3,
    "explanation": "The coronation was on 6 June 1674; the remarriage date given is wrong."
  },
  {
    "number": 128,
    "text": "Arrange by year of birth: (a) Sant Tukaram (b) Chaitanya (c) Guru Nanak (d) Kabir",
    "options": [
      "a, b, c, d",
      "b, d, c, a",
      "c, a, d, b",
      "d, c, b, a"
    ],
    "correctOption": 4,
    "explanation": "Kabir → Nanak (1469) → Chaitanya (1486) → Tukaram (1608)."
  },
  {
    "number": 129,
    "text": "Which statement is NOT correct about Raja Ram Mohan Roy?",
    "options": [
      "He condemned idol worship and Brahmanical rituals",
      "He propagated monotheism",
      "He depended on Vedic and Puranic literature to support his arguments",
      "He wrote the pamphlet 'Anusthan' prescribing worship in the Samaj"
    ],
    "correctOption": 3,
    "explanation": "He relied on the Vedas and Upanishads and rejected Puranic practices."
  },
  {
    "number": 130,
    "text": "Which statement is NOT correct about the Portuguese in India?",
    "options": [
      "Vasco da Gama reached Calicut in 1498, received by the Zamorin",
      "Almeida followed the Blue Water Policy",
      "The Portuguese conquered Goa from the Mysore rulers in 1510",
      "Albuquerque tried to abolish sati"
    ],
    "correctOption": 3,
    "explanation": "Goa was taken from Bijapur."
  },
  {
    "number": 131,
    "text": "Arrange by inception: (a) Indian Association (b) Poona Sarvajanik Sabha (c) Madras Mahajana Sabha (d) Bombay Presidency Association",
    "options": [
      "a, b, c, d",
      "b, a, c, d",
      "c, d, b, a",
      "d, c, a, b"
    ],
    "correctOption": 2,
    "explanation": "1870, 1876, 1884, 1885."
  },
  {
    "number": 132,
    "text": "Who was NOT associated with the defence of INA prisoners (1945–46)?",
    "options": [
      "Bhulabhai Desai",
      "Jawaharlal Nehru",
      "Mahadev Desai",
      "Asaf Ali"
    ],
    "correctOption": 3,
    "explanation": "Mahadev Desai died in 1942."
  },
  {
    "number": 133,
    "text": "Arrange chronologically: (a) Deliverance Day (b) Lucknow Pact (c) Direct Action Day (d) Establishment of All India Muslim League",
    "options": [
      "d, a, b, c",
      "d, b, a, c",
      "d, b, c, a",
      "d, c, b, a"
    ],
    "correctOption": 2,
    "explanation": "1906, 1916, 1939, 1946."
  },
  {
    "number": 134,
    "text": "Which opinion on the 1857 revolt is NOT correctly attributed?",
    "options": [
      "John Seeley: a wholly unpatriotic, selfish sepoy mutiny",
      "James Outram & W. Tayler: a Hindu-Muslim conspiracy",
      "R.C. Majumdar: not a war of independence",
      "William Dalrymple: a conflict between civilization and barbarism"
    ],
    "correctOption": 4,
    "explanation": "That view is T.R. Holmes's, not Dalrymple's."
  },
  {
    "number": 135,
    "text": "Tropical monsoon forests are normally",
    "options": [
      "Evergreen",
      "Deciduous",
      "Temperate",
      "Mangrove"
    ],
    "correctOption": 2,
    "explanation": ""
  },
  {
    "number": 136,
    "text": "Predominant vegetation of hot deserts",
    "options": [
      "Xerophytes",
      "Mesophytes",
      "Hygrophytes",
      "Hydrophytes"
    ],
    "correctOption": 1,
    "explanation": ""
  },
  {
    "number": 137,
    "text": "The hot, dry wind that originates in the Sahara is",
    "options": [
      "Sirocco",
      "Leveche",
      "Chili",
      "Loo"
    ],
    "correctOption": 1,
    "explanation": ""
  },
  {
    "number": 138,
    "text": "Mediterranean lands are also known as",
    "options": [
      "Orchard lands",
      "Dry grass lands",
      "Evergreen lands",
      "Nomadic lands"
    ],
    "correctOption": 1,
    "explanation": ""
  },
  {
    "number": 139,
    "text": "The planet that takes 88 days to revolve around the sun",
    "options": [
      "Jupiter",
      "Mars",
      "Mercury",
      "Saturn"
    ],
    "correctOption": 3,
    "explanation": ""
  },
  {
    "number": 140,
    "text": "Which is a source region for air masses?",
    "options": [
      "The Himalayas",
      "The Equatorial forest",
      "The Deccan plateau",
      "The Siberian plain"
    ],
    "correctOption": 4,
    "explanation": ""
  },
  {
    "number": 141,
    "text": "Sub-tropical high pressure belts are also called",
    "options": [
      "Doldrums",
      "Wind convergence",
      "Horse latitudes",
      "Frontal rains"
    ],
    "correctOption": 3,
    "explanation": ""
  },
  {
    "number": 142,
    "text": "The largest physiographic division of India",
    "options": [
      "Greater Himalayas",
      "Greater Northern plains",
      "Greater Indian plateau",
      "Coastal plains"
    ],
    "correctOption": 3,
    "explanation": ""
  },
  {
    "number": 143,
    "text": "MMTS (Hyderabad) was started on",
    "options": [
      "9 July 2003",
      "9 August 2003",
      "9 September 2003",
      "9 October 2003"
    ],
    "correctOption": 2,
    "explanation": ""
  },
  {
    "number": 144,
    "text": "Karewa soil is known for the cultivation of",
    "options": [
      "Citrus fruits",
      "Floriculture",
      "Coarse grains",
      "Saffron"
    ],
    "correctOption": 4,
    "explanation": ""
  },
  {
    "number": 145,
    "text": "Namchik coal mine is located in",
    "options": [
      "Meghalaya",
      "Assam",
      "Arunachal Pradesh",
      "Tripura"
    ],
    "correctOption": 3,
    "explanation": ""
  },
  {
    "number": 146,
    "text": "Konkan Railway transportation started on",
    "options": [
      "15 Aug 1996",
      "15 Aug 1997",
      "15 Aug 1998",
      "15 Aug 1999"
    ],
    "correctOption": 3,
    "explanation": "Commercial operations began in 1998."
  },
  {
    "number": 147,
    "text": "The India–Pakistan boundary is an example of",
    "options": [
      "Superimposed boundary",
      "Subsequent boundary",
      "Antecedent boundary",
      "Relict boundary"
    ],
    "correctOption": 1,
    "explanation": ""
  },
  {
    "number": 148,
    "text": "The most urbanized state among these",
    "options": [
      "Punjab",
      "Gujarat",
      "Karnataka",
      "Tamil Nadu"
    ],
    "correctOption": 4,
    "explanation": ""
  },
  {
    "number": 149,
    "text": "Central Arid Zone Research Institute is located at",
    "options": [
      "Bangalore",
      "Ranchi",
      "Jodhpur",
      "Jaipur"
    ],
    "correctOption": 3,
    "explanation": ""
  },
  {
    "number": 150,
    "text": "Which state has the lowest HDI?",
    "options": [
      "Bihar",
      "Haryana",
      "Himachal Pradesh",
      "Punjab"
    ],
    "correctOption": 1,
    "explanation": ""
  },
  {
    "number": 151,
    "text": "Which Part of the Constitution deals with Amendments?",
    "options": [
      "XXI",
      "XXII",
      "XX",
      "IX"
    ],
    "correctOption": 3,
    "explanation": "Part XX, Article 368."
  },
  {
    "number": 152,
    "text": "Equal justice and free legal aid are part of",
    "options": [
      "Directive Principles of State Policy",
      "Fundamental Rights",
      "Fundamental Duties",
      "Citizenship"
    ],
    "correctOption": 1,
    "explanation": "Article 39A."
  },
  {
    "number": 153,
    "text": "Which pass is NOT correctly matched?",
    "options": [
      "Lanak La – Ladakh",
      "Bomdila – Sikkim",
      "Mana Pass – Uttarakhand",
      "Shipki La – Himachal Pradesh"
    ],
    "correctOption": 2,
    "explanation": "Bomdila is in Arunachal Pradesh."
  },
  {
    "number": 154,
    "text": "'Citizens, men and women equally, have the right to an adequate means of livelihood' is in",
    "options": [
      "Directive Principles",
      "Centre-State Relations",
      "Federal Policy",
      "Fundamental Duties"
    ],
    "correctOption": 1,
    "explanation": "Article 39(a)."
  },
  {
    "number": 155,
    "text": "Parliament means",
    "options": [
      "Lok Sabha",
      "Rajya Sabha",
      "The President",
      "All the above"
    ],
    "correctOption": 4,
    "explanation": ""
  },
  {
    "number": 156,
    "text": "'A body of persons registered in the electoral rolls of a village within a panchayat' is called",
    "options": [
      "District",
      "Gram Sabha",
      "Panchayat Area",
      "None of the above"
    ],
    "correctOption": 2,
    "explanation": ""
  },
  {
    "number": 157,
    "text": "Which party-competition model currently works in India?",
    "options": [
      "One-party dominance",
      "Bipolar competition",
      "Two-plus competition",
      "Multiparty competition"
    ],
    "correctOption": 4,
    "explanation": ""
  },
  {
    "number": 158,
    "text": "'The State shall provide free and compulsory education to all children of 6–14 years' is part of",
    "options": [
      "Right to Equality",
      "Right against Exploitation",
      "Right to Freedom of Religion",
      "Right to Freedom"
    ],
    "correctOption": 4,
    "explanation": "Article 21A falls under Right to Freedom."
  },
  {
    "number": 159,
    "text": "Deen Dayal Upadhyaya Grameen Kaushalya Yojana is part of",
    "options": [
      "Ministry of Rural Development",
      "Ministry of Social Justice",
      "Ministry of Communication",
      "Ministry of MSME"
    ],
    "correctOption": 1,
    "explanation": ""
  },
  {
    "number": 160,
    "text": "Heavy industrialisation was initiated in which Five-Year Plan?",
    "options": [
      "Second",
      "First",
      "Third",
      "Sixth"
    ],
    "correctOption": 1,
    "explanation": ""
  },
  {
    "number": 161,
    "text": "Which sector contributes the most to the Indian economy?",
    "options": [
      "Service",
      "Manufacturing",
      "Agriculture",
      "Small-scale industry"
    ],
    "correctOption": 1,
    "explanation": ""
  },
  {
    "number": 162,
    "text": "In which type of unemployment is the marginal productivity of workers zero?",
    "options": [
      "Seasonal",
      "Involuntary",
      "Disguised",
      "Structural"
    ],
    "correctOption": 3,
    "explanation": ""
  },
  {
    "number": 163,
    "text": "Identify the non-constitutional body",
    "options": [
      "National Human Rights Commission",
      "Election Commission",
      "National Commission for SCs",
      "National Commission for STs"
    ],
    "correctOption": 1,
    "explanation": "NHRC is statutory."
  },
  {
    "number": 164,
    "text": "What is monetary policy?",
    "options": [
      "Parliament controls money supply",
      "Central bank controls money supply",
      "IMF controls money supply",
      "World Bank controls money supply"
    ],
    "correctOption": 2,
    "explanation": ""
  },
  {
    "number": 165,
    "text": "If a country's balance of payments is adverse, which institution helps?",
    "options": [
      "World Bank",
      "WTO",
      "IMF",
      "Asian Development Bank"
    ],
    "correctOption": 3,
    "explanation": ""
  },
  {
    "number": 166,
    "text": "Which are called the Twins of Bretton Woods?",
    "options": [
      "IMF & IBRD",
      "IMF & WTO",
      "IBRD & WHO",
      "ADB & WHO"
    ],
    "correctOption": 1,
    "explanation": ""
  },
  {
    "number": 167,
    "text": "Who was the founder of the 'Hyderabad Protection Samithi'?",
    "options": [
      "Burgula Ramakrishna Rao",
      "Hayagreevachari",
      "Ramachary",
      "Mandumula Narsinga Rao"
    ],
    "correctOption": 3,
    "explanation": "Answer as per our reading of the source; verify if this one matters to you."
  },
  {
    "number": 168,
    "text": "The Gentlemen's Agreement at Delhi was signed on",
    "options": [
      "16 Feb 1956",
      "18 Feb 1956",
      "19 Feb 1956",
      "20 Feb 1956"
    ],
    "correctOption": 4,
    "explanation": ""
  },
  {
    "number": 169,
    "text": "When was the first Industrial Policy of India launched?",
    "options": [
      "1956",
      "1948",
      "1951",
      "1965"
    ],
    "correctOption": 2,
    "explanation": ""
  },
  {
    "number": 170,
    "text": "Who organised the Democratic Telangana conference in December 1997 under the 'All India People Resistance Forum'?",
    "options": [
      "Marri Chenna Reddy",
      "K. Jayashankar",
      "Kaloji Narayana Rao",
      "Veda Kumar"
    ],
    "correctOption": 2,
    "explanation": "Official key: (2)."
  },
  {
    "number": 171,
    "text": "Commission appointed by the TDP government in June 2001",
    "options": [
      "Bhargava Commission",
      "J.M. Girglani Commission",
      "Non-Mulki Protection Commission",
      "Telangana Mulki Commission"
    ],
    "correctOption": 2,
    "explanation": ""
  },
  {
    "number": 172,
    "text": "Historical importance of 27 April 2001 in the final phase of the Telangana movement",
    "options": [
      "Formation of Telangana Elite Forum",
      "Foundation of Telangana Jana Sabha",
      "Bhongir Declaration",
      "Foundation of Telangana Rashtra Samithi"
    ],
    "correctOption": 4,
    "explanation": ""
  },
  {
    "number": 173,
    "text": "The 'Nizam Subjects League' was founded by a few educated elites of Hyderabad State in",
    "options": [
      "1926",
      "1930",
      "1932",
      "1934"
    ],
    "correctOption": 4,
    "explanation": "Key answer: 1934."
  },
  {
    "number": 174,
    "text": "Who was the Home Minister of India when the Gentlemen's Agreement was signed in 1956?",
    "options": [
      "Sardar Patel",
      "Govind Ballabh Pant",
      "Morarji Desai",
      "Maulana Azad"
    ],
    "correctOption": 2,
    "explanation": ""
  },
  {
    "number": 175,
    "text": "How many seats did the Telangana Praja Samithi win in the 1971 general elections?",
    "options": [
      "12",
      "11",
      "14",
      "10"
    ],
    "correctOption": 4,
    "explanation": ""
  },
  {
    "number": 176,
    "text": "Editor of 'Imroz', a popular paper in Hyderabad State under Osman Ali Khan",
    "options": [
      "Md. Arif Khan",
      "Md. Iqbal",
      "Shoebullah Khan",
      "Raza Ali Khan"
    ],
    "correctOption": 3,
    "explanation": ""
  },
  {
    "number": 177,
    "text": "Arrange chronologically: (a) Telangana Vidrohadinam (b) Bhuvanagiri Declaration (c) Namaste Telangana daily launched (d) Sagaraharam",
    "options": [
      "a, c, d, b",
      "b, c, d, a",
      "a, b, c, d",
      "d, b, a, c"
    ],
    "correctOption": 3,
    "explanation": "Official key: (3)."
  },
  {
    "number": 178,
    "text": "Who described the post of Deputy Chief Minister as a 'sixth finger to a hand'?",
    "options": [
      "M. Chenna Reddy",
      "Neelam Sanjeeva Reddy",
      "B. Ramakrishna Rao",
      "K. Brahmananda Reddy"
    ],
    "correctOption": 2,
    "explanation": ""
  },
  {
    "number": 179,
    "text": "Which Andhra leader was NOT a signatory to the 1956 Gentlemen's Agreement?",
    "options": [
      "Damodaram Sanjeevaiah",
      "N. Sanjeeva Reddy",
      "Gouthu Latchanna",
      "B. Gopala Reddy"
    ],
    "correctOption": 1,
    "explanation": ""
  },
  {
    "number": 180,
    "text": "Justice Srikrishna Committee submitted its report to the UPA government on",
    "options": [
      "30 Nov 2011",
      "3 Feb 2010",
      "31 Dec 2011",
      "23 Dec 2009"
    ],
    "correctOption": 3,
    "explanation": "The report came on 30 Dec 2010; option (3) is the nearest printed date."
  },
  {
    "number": 181,
    "text": "Arrange (second phase of Telangana movement): (a) Appointment of Srikrishna Committee (b) Rail Bandh (c) Million March (d) Kiran Kumar Reddy's resignation",
    "options": [
      "a, b, c, d",
      "b, d, a, c",
      "d, b, c, a",
      "b, c, a, d"
    ],
    "correctOption": 1,
    "explanation": ""
  },
  {
    "number": 182,
    "text": "Students conducted 'Telangana Vidyarthi Garjana' at Osmania University on",
    "options": [
      "14 June 2013",
      "3 Jan 2010",
      "3 Jan 2012",
      "10 April 2011"
    ],
    "correctOption": 2,
    "explanation": ""
  },
  {
    "number": 183,
    "text": "Who first brought the illegal appointment of non-locals at Kothagudem Thermal Power Station into public view?",
    "options": [
      "A. Ramadas",
      "A. Ravindranath",
      "Sree Ramadas",
      "I. Kiran Nath"
    ],
    "correctOption": 3,
    "explanation": ""
  },
  {
    "number": 184,
    "text": "Impact of climate change on the troposphere",
    "options": [
      "Increased CO₂ raises C₃ plant productivity",
      "Increased CO₂ raises C₄ plant productivity",
      "Precipitation increases everywhere",
      "Temperature decreases everywhere"
    ],
    "correctOption": 1,
    "explanation": "C₃ plants gain more from extra CO₂. (The marked paper shows (2).)"
  },
  {
    "number": 185,
    "text": "Which radioactive element is used for nuclear fission reactions?",
    "options": [
      "Thorium",
      "Uranium",
      "Barium",
      "Actinium"
    ],
    "correctOption": 2,
    "explanation": ""
  },
  {
    "number": 186,
    "text": "Satellite communication uses",
    "options": [
      "Visible light",
      "X-rays",
      "Microwaves",
      "Radio waves"
    ],
    "correctOption": 3,
    "explanation": ""
  },
  {
    "number": 187,
    "text": "Code name of India's first nuclear test",
    "options": [
      "Chagai",
      "Pokhran",
      "Smiling Buddha",
      "Pinaka"
    ],
    "correctOption": 3,
    "explanation": ""
  },
  {
    "number": 188,
    "text": "Internet speed is measured in",
    "options": [
      "GHz",
      "GB",
      "dpi",
      "Gbps"
    ],
    "correctOption": 4,
    "explanation": ""
  },
  {
    "number": 189,
    "text": "Common components of photochemical smog",
    "options": [
      "Ozone and SO₂",
      "NO₂ and SO₂",
      "Formaldehyde and PAN",
      "Ozone, formaldehyde and PAN"
    ],
    "correctOption": 4,
    "explanation": ""
  },
  {
    "number": 190,
    "text": "The first patent on a human gene sequence is on which chromosome and linked to which disease?",
    "options": [
      "4 and Huntington",
      "23 and Hemophilia",
      "7 and Cystic fibrosis",
      "17 and Cancer"
    ],
    "correctOption": 3,
    "explanation": ""
  },
  {
    "number": 191,
    "text": "Reason for rising sea levels in some coastal areas",
    "options": [
      "Decrease of CO₂ in troposphere",
      "Increase of O₃ in stratosphere",
      "CH₄ trapped beneath the frozen soil of Alaska",
      "Afforestation"
    ],
    "correctOption": 3,
    "explanation": "Released methane adds to warming and ice melt."
  },
  {
    "number": 192,
    "text": "Which plant has high protein and is rich in thiamine in its seeds?",
    "options": [
      "Brassica rapa",
      "Arachis hypogaea",
      "Linum usitatissimum",
      "Pennisetum glaucum"
    ],
    "correctOption": 2,
    "explanation": "Groundnut."
  },
  {
    "number": 193,
    "text": "Main reason for ozone layer depletion",
    "options": [
      "CO from vehicles",
      "SO₂ from fuels",
      "Chlorofluorocarbons",
      "Methane in atmosphere"
    ],
    "correctOption": 3,
    "explanation": ""
  },
  {
    "number": 194,
    "text": "Function of a modem",
    "options": [
      "Encryption and decryption",
      "Voice-data conversion",
      "Converts analog ↔ digital signals",
      "Checks for virus"
    ],
    "correctOption": 3,
    "explanation": ""
  },
  {
    "number": 195,
    "text": "Death of nearby cells in a tissue through autolysis after injury is called",
    "options": [
      "Neurosis",
      "Necrosis",
      "Apoptosis",
      "Cellular senescence"
    ],
    "correctOption": 2,
    "explanation": ""
  },
  {
    "number": 196,
    "text": "Arrange the events of biogeny theory: A. Formation of coacervates B. Aerobic organisms C. Heterotrophic organisms D. Mycoplasmas are the first cells",
    "options": [
      "A, D, C, B",
      "A, C, D, B",
      "B, A, C, D",
      "A, B, C, D"
    ],
    "correctOption": 1,
    "explanation": ""
  },
  {
    "number": 197,
    "text": "In fibre-optic communication the light source is",
    "options": [
      "LED",
      "CFL",
      "Diode",
      "Semiconductor laser"
    ],
    "correctOption": 4,
    "explanation": ""
  },
  {
    "number": 198,
    "text": "Size of quantum nano dots is around",
    "options": [
      "300 nm",
      "200 nm",
      "100 nm",
      "10 nm"
    ],
    "correctOption": 4,
    "explanation": ""
  },
  {
    "number": 199,
    "text": "Data scientists require",
    "options": [
      "Data visualisation only",
      "Machine learning only",
      "Statistics only",
      "All the above"
    ],
    "correctOption": 4,
    "explanation": ""
  },
  {
    "number": 200,
    "text": "Increased blood clotting time is due to deficiency of",
    "options": [
      "Vitamin K",
      "Vitamin B₁",
      "Vitamin A",
      "Vitamin C"
    ],
    "correctOption": 1,
    "explanation": ""
  }
];
