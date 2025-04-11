// import {
//     div,
//     label,
//     input,
//     select,
//     option,
//     p,
//     br,
//   } from "../../scripts/dom-helper.js";
//   export default function decorate(block) {
//     const yearsOptions = [1, 3, 5, 10, 15];
//     const counter = [];
//     for (let index = 1; index <= 13; index++) {
//       counter.push(index);
//     }
//     block.append(
//       div(
//         { class: "mainDiv" },
//         div(
//           { class: "amount-div commonclass" },
//           label("Your Monthly SIP Amount"),
//           br(),
//           input({
//             type: "text",
//             value: "5000",
//             class: "amount",
//             onchange: calculateSIP,
//           })
//         ),
//         div(
//           { class: "year-div commonclass" },
//           label("Duration"),
//           br(),
//           select(
//             { class: "years", onchange: calculateSIP },
//             ...yearsOptions.map((year) => {
//               return option({ value: year }, year + " year");
//             })
//           )
//         ),
//         div(
//           { class: "commonclass" },
//           p({ class: "resulatinvestamut" }, "Investment Amt", br(), "60000.00")
//         ),
//         div(
//           { class: "rate-div2 commonclass" },
//           div(
//             { class: "rate-div" },
//             label("Expected Annual Return"),
//             select(
//               { class: "returnRate", onchange: calculateSIP },
//               ...counter.map((element) => {
//                 return option({ value: element }, element + " %");
//               })
//             )
//           ),
//           p({ class: "displayestimateamt" }, "60326.00")
//         )
//         //div({ class: "result-div commonclass" }, p({ class: "result" })),
//         //button({ onclick: calculateSIP }, "Calculate")
//       )
//     );
//   }
import fgbvcbnhghn from "../form/form.js";
export default function decorate(block) {
  const blockcontent = block.textContent.trim();
  console.log(blockcontent);
  fgbvcbnhghn(block, blockcontent);
}
