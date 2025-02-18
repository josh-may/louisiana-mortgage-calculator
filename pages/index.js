import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import HomeBuyerGame from "../components/HomeBuyerGame";

export default function Home() {
  const [formData, setFormData] = useState({
    loanAmount: "",
    interestRate: "",
    loanTerm: "",
  });
  const [monthlyPayment, setMonthlyPayment] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const calculateMortgage = (e) => {
    e.preventDefault();
    const { loanAmount, interestRate, loanTerm } = formData;
    const principal = parseFloat(loanAmount);
    const monthlyRate = parseFloat(interestRate) / 100 / 12;
    const numberOfPayments = parseFloat(loanTerm) * 12;

    const monthly =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    setMonthlyPayment(monthly.toFixed(2));
  };

  return (
    <div className="font-serif bg-gray-100 text-black p-5 max-w-4xl mx-auto">
      <Head>
        <title>Illinois Mortgage Calculator</title>
        <meta
          name="description"
          content="Calculate your mortgage payments in Illinois"
        />
      </Head>

      <header className="bg-gradient-to-b from-blue-700 to-blue-500 p-5 text-center mb-3 border-2 border-black">
        <h1 className="text-white text-3xl font-bold mb-2">
          Illinois Mortgage Calculator
        </h1>
        <p className="text-blue-100 text-lg max-w-2xl mx-auto">
          Estimate your mortgage costs in Illinois, the 21st most affordable
          state in the US.
        </p>
      </header>

      <main className="flex flex-col gap-3">
        <section className="bg-gradient-to-b from-blue-200 to-blue-100 border-2 border-blue-400 p-5 shadow-md ">
          <form onSubmit={calculateMortgage} className="space-y-4">
            <h3 className="text-blue-800 text-2xl font-bold text-center mb-4 shadow-text">
              Calculate Your Mortgage
            </h3>
            {["loanAmount", "interestRate", "loanTerm"].map((field) => (
              <div key={field} className="bg-white p-3 rounded-md shadow-sm">
                <label
                  htmlFor={field}
                  className="block font-bold mb-1 text-blue-700"
                >
                  {field
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                  :
                </label>
                <input
                  type="number"
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleInputChange}
                  required
                  step={field === "interestRate" ? "0.01" : "1"}
                  className="w-full p-2 border-2 border-blue-300 rounded focus:border-blue-500 focus:outline-none"
                />
              </div>
            ))}
            <div className="text-center mt-6">
              <button
                type="submit"
                className="bg-gradient-to-b from-yellow-300 to-yellow-400 text-blue-800 font-bold py-2 px-6 rounded-full border-2 border-yellow-500 hover:from-yellow-400 hover:to-yellow-500 shadow-md transition duration-300"
              >
                Calculate Now!
              </button>
            </div>
          </form>
          {monthlyPayment && (
            <div className="mt-6 border-2 border-blue-400 p-4 bg-white text-center rounded-lg shadow-inner">
              <h3 className="text-blue-800 font-bold mb-2 text-lg">
                Your Monthly Payment:
              </h3>
              <p className="text-3xl font-bold text-green-600">
                ${monthlyPayment}
              </p>
            </div>
          )}
        </section>

        <section className="bg-white border-2 border-gray-400 p-5 shadow-md ">
          <h3 className="text-blue-800 text-xl font-bold mb-4">
            Mortgage FAQs
          </h3>

          <div className="space-y-4">
            <div>
              <h4 className="text-blue-700 font-semibold mb-2">
                How to calculate a mortgage payment
              </h4>
              <p>
                Mortgage payments are calculated based on the loan amount,
                interest rate, and loan term. The formula takes into account the
                principal and interest payments over the life of the loan.
              </p>
            </div>

            <div>
              <h4 className="text-blue-700 font-semibold mb-2">
                Formula for calculating a mortgage payment
              </h4>
              <p>
                The basic formula is: M = P [ i(1 + i)^n ] / [ (1 + i)^n - 1],
                where M is the monthly payment, P is the principal loan amount,
                i is the monthly interest rate, and n is the number of payments
                over the loan&apos;s lifetime.
              </p>
            </div>

            <div>
              <h4 className="text-blue-700 font-semibold mb-2">
                How a mortgage calculator helps you
              </h4>
              <p>
                A mortgage calculator simplifies the complex calculations
                involved in determining your monthly payments. It allows you to
                quickly see how different loan amounts, interest rates, and
                terms affect your payments.
              </p>
            </div>

            <div>
              <h4 className="text-blue-700 font-semibold mb-2">
                How lenders decide how much you can afford to borrow
              </h4>
              <p>
                Lenders typically use the 28/36 rule: your monthly mortgage
                payments should not exceed 28% of your gross monthly income, and
                your total monthly debt payments should not exceed 36% of your
                gross monthly income.
              </p>
            </div>

            <div>
              <h4 className="text-blue-700 font-semibold mb-2">
                Typical costs included in a mortgage payment
              </h4>
              <p>
                A typical mortgage payment includes principal, interest,
                property taxes, and homeowners insurance (PITI). Some loans may
                also include private mortgage insurance (PMI) or homeowners
                association (HOA) fees.
              </p>
            </div>

            <div>
              <h4 className="text-blue-700 font-semibold mb-2">
                Reducing monthly mortgage payments
              </h4>
              <p>
                You can reduce your monthly payments by making a larger down
                payment, finding a lower interest rate, extending the loan term,
                or buying a less expensive home. Refinancing can also
                potentially lower your payments.
              </p>
            </div>

            <div>
              <h4 className="text-blue-700 font-semibold mb-2">
                Monthly mortgage payments can go up
              </h4>
              <p>
                Your monthly payments can increase if you have an
                adjustable-rate mortgage (ARM) and interest rates rise, or if
                your property taxes or homeowners insurance premiums increase.
              </p>
            </div>
          </div>
        </section>

        <HomeBuyerGame />

        <section className="bg-white border-2 border-gray-400 p-5 shadow-md">
          <h3 className="text-blue-800 text-lg font-bold mb-3 underline">
            Mortgage Loans From Our Partners
          </h3>
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <a
              href="https://launchpad.rocketmortgage.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-blue-50 p-4 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors"
            >
              <h4 className="font-bold text-blue-800 mb-2">Rocket Mortgage</h4>
              <p className="text-sm">
                Explore competitive rates and a streamlined application process.
              </p>
            </a>
            <a
              href="https://nbkc-nerd-wallet-va.secure-clix.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-blue-50 p-4 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors"
            >
              <h4 className="font-bold text-blue-800 mb-2">NBKC Bank</h4>
              <p className="text-sm">
                Get your custom quote in just 30 seconds with NBKC Bank.
              </p>
            </a>
            <a
              href="https://better.com/b/nerdwallet"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-blue-50 p-4 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors"
            >
              <h4 className="font-bold text-blue-800 mb-2">Better Mortgage</h4>
              <p className="text-sm">
                Apply 100% online with expert customer support from Better.
              </p>
            </a>
          </div>
        </section>
        <section className="bg-blue-100 border-2 border-blue-400 p-5 shadow-md">
          <h3 className="text-blue-800 text-lg font-bold mb-3 underline">
            Know How Much You Qualify For
          </h3>
          <p className="mb-4">
            Find out how much you can borrow for your dream home:
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <a
              href="https://www.newamericanfunding.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-white p-4 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors"
            >
              <h4 className="font-bold text-blue-800 mb-2">
                New American Funding
              </h4>
              <p className="text-sm">
                Get prequalified and explore your loan options.
              </p>
            </a>
            <a
              href="https://nbkc-nerd-wallet-review.secure-clix.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-white p-4 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors"
            >
              <h4 className="font-bold text-blue-800 mb-2">NBKC Bank</h4>
              <p className="text-sm">
                Get your custom quote in just 30 seconds.
              </p>
            </a>
            <a
              href="https://www.rate.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-white p-4 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors"
            >
              <h4 className="font-bold text-blue-800 mb-2">Rate.com</h4>
              <p className="text-sm">
                Use their tools to calculate your mortgage options.
              </p>
            </a>
          </div>
        </section>

        <section className="bg-white border-2 border-gray-400 p-5 shadow-md ">
          <h3 className="text-blue-800 text-lg font-bold mb-3 underline">
            Illinois Mortgage and Refinance Rates Today (APR)
          </h3>
          <p className="text-sm mb-2">Accurate as of 08/05/2024.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-blue-100">
                  <th className="p-2 text-left">Product</th>
                  <th className="p-2 text-left">Interest rate</th>
                  <th className="p-2 text-left">APR</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["30-year fixed-rate", "6.092%", "6.169%"],
                  ["20-year fixed-rate", "5.801%", "5.886%"],
                  ["15-year fixed-rate", "5.116%", "5.224%"],
                  ["10-year fixed-rate", "5.719%", "5.948%"],
                  ["7-year ARM", "6.030%", "7.109%"],
                  ["5-year ARM", "6.144%", "7.420%"],
                  ["30-year fixed-rate FHA", "5.969%", "6.741%"],
                  ["30-year fixed-rate VA", "5.219%", "5.588%"],
                ].map((row, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-100" : ""}
                  >
                    <td className="p-2">{row[0]}</td>
                    <td className="p-2">{row[1]}</td>
                    <td className="p-2">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs mt-2">
            Data source: ©Zillow, Inc. 2006 – 2021. Use is subject to the Terms
            of Use
          </p>
        </section>

        <section className="bg-white border-2 border-gray-400 p-5 shadow-md ">
          <h3 className="text-blue-800 text-lg font-bold mb-3 underline">
            Average Property Tax in Illinois Counties
          </h3>
          <p className="mb-4">
            Taking U.S. Census data, NerdWallet has crunched the numbers to help
            you understand what property tax rate you can expect to pay on your
            future home in Illinois. Because assessed values aren&apos;t
            frequently updated, you may pay a higher rate at first but
            eventually you&apos;ll pay a similar rate.
          </p>
          <div className="overflow-x-auto">
            <div className="max-h-80 overflow-y-auto">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-blue-100">
                  <tr>
                    <th className="p-2 text-left">County</th>
                    <th className="p-2 text-left">Avg. property tax rate</th>
                    <th className="p-2 text-left">Avg. home value</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Cook County", "2.10%", "$246,600"],
                    ["DuPage County", "2.11%", "$308,500"],
                    ["Lake County", "2.55%", "$267,300"],
                    ["Will County", "2.30%", "$230,700"],
                    ["Kane County", "2.69%", "$240,300"],
                    ["McHenry County", "2.62%", "$223,100"],
                    ["Winnebago County", "2.96%", "$124,100"],
                    ["St. Clair County", "2.40%", "$134,300"],
                    ["Madison County", "2.24%", "$140,100"],
                    ["Champaign County", "2.13%", "$164,000"],
                    ["Sangamon County", "2.09%", "$143,900"],
                    ["Peoria County", "2.05%", "$134,100"],
                    ["McLean County", "2.17%", "$171,600"],
                    ["Rock Island County", "2.40%", "$124,300"],
                    ["Tazewell County", "2.09%", "$145,000"],
                    ["Kendall County", "2.54%", "$237,300"],
                    ["Macon County", "2.24%", "$103,600"],
                    ["Kankakee County", "2.76%", "$147,500"],
                    ["Vermilion County", "2.28%", "$86,400"],
                    ["DeKalb County", "2.67%", "$180,500"],
                  ].map((row, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-gray-100" : ""}
                    >
                      <td className="p-2">{row[0]}</td>
                      <td className="p-2">{row[1]}</td>
                      <td className="p-2">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="bg-white border-2 border-gray-400 p-5 shadow-md ">
          <h3 className="text-blue-800 text-xl font-bold mb-4">
            Mortgage Calculators by State
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "Alabama",
              "Alaska",
              "Arizona",
              "Arkansas",
              "California",
              "Colorado",
              "Connecticut",
              "Delaware",
              "Florida",
              "Georgia",
              "Hawaii",
              "Idaho",
              "Illinois",
              "Indiana",
              "Iowa",
              "Kansas",
              "Kentucky",
              "Louisiana",
              "Maine",
              "Maryland",
              "Massachusetts",
              "Michigan",
              "Minnesota",
              "Mississippi",
              "Missouri",
              "Montana",
              "Nebraska",
              "Nevada",
              "New Hampshire",
              "New Jersey",
              "New Mexico",
              "New York",
              "North Carolina",
              "North Dakota",
              "Ohio",
              "Oklahoma",
              "Oregon",
              "Pennsylvania",
              "Rhode Island",
              "South Carolina",
              "South Dakota",
              "Tennessee",
              "Texas",
              "Utah",
              "Vermont",
              "Virginia",
              "Washington",
              "West Virginia",
              "Wisconsin",
              "Wyoming",
            ].map((state) => (
              <a
                key={state}
                href={`#`}
                className="text-blue-600 hover:text-blue-800 hover:underline"
              >
                {state}
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-blue-700 text-white p-4 border-t-2 border-black">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>&copy; 2024 Illinois Mortgage Calculator</div>
          <nav className="mt-2 md:mt-0">
            <Link href="/contact" className="mx-2 hover:underline">
              Contact
            </Link>
            <Link href="/about" className="mx-2 hover:underline">
              About
            </Link>
            <Link href="/blog" className="mx-2 hover:underline">
              Blog
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
