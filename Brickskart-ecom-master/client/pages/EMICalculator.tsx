import { useState } from "react";
import { Calculator, IndianRupee, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";


const EMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [tenure, setTenure] = useState("");

  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const calculateEMI = () => {
    const principal = Number(loanAmount);
    const annualRate = Number(interestRate);
    const years = Number(tenure);

    if (!principal || !annualRate || !years) {
      return;
    }

    const monthlyRate = annualRate / 12 / 100;
    const numberOfMonths = years * 12;

    const calculatedEMI =
      (principal *
        monthlyRate *
        Math.pow(1 + monthlyRate, numberOfMonths)) /
      (Math.pow(1 + monthlyRate, numberOfMonths) - 1);

    const calculatedTotalAmount = calculatedEMI * numberOfMonths;
    const calculatedInterest = calculatedTotalAmount - principal;

    setEmi(calculatedEMI);
    setTotalAmount(calculatedTotalAmount);
    setTotalInterest(calculatedInterest);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
   
      <div className="min-h-screen bg-[#F7F1E7] px-4 py-12">

        <div className="mx-auto max-w-5xl">

          {/* HEADER */}

          <div className="mb-10 text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#6E473B] text-[#F7F1E7]">
              <Calculator size={32} />
            </div>

            <h1 className="mt-5 text-4xl font-black text-[#291C0E]">
              EMI Calculator
            </h1>

            <p className="mx-auto mt-3 max-w-2xl text-[#6E473B]">
              Calculate your monthly loan EMI, total interest and
              total amount payable for your construction project.
            </p>

          </div>


          {/* CALCULATOR */}

          <div className="grid gap-8 lg:grid-cols-2">

            {/* INPUT CARD */}

            <div className="rounded-3xl border border-[#D8C8B8] bg-[#F7F1E7] p-8 shadow-lg">

              <h2 className="text-2xl font-bold text-[#291C0E]">
                Loan Details
              </h2>

              {/* LOAN AMOUNT */}

              <div className="mt-6">

                <label className="mb-2 block font-semibold text-[#291C0E]">
                  Loan Amount
                </label>

                <div className="relative">

                  <IndianRupee
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6E473B]"
                  />

                  <input
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    placeholder="Enter loan amount"
                    className="w-full rounded-xl border border-[#D8C8B8] bg-white py-3 pl-11 pr-4 text-[#291C0E] outline-none focus:border-[#6E473B] focus:ring-2 focus:ring-[#C9A66B]/30"
                  />

                </div>

              </div>


              {/* INTEREST RATE */}

              <div className="mt-5">

                <label className="mb-2 block font-semibold text-[#291C0E]">
                  Interest Rate (% per year)
                </label>

                <input
                  type="number"
                  step="0.01"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  placeholder="Example: 8.5"
                  className="w-full rounded-xl border border-[#D8C8B8] bg-white px-4 py-3 text-[#291C0E] outline-none focus:border-[#6E473B] focus:ring-2 focus:ring-[#C9A66B]/30"
                />

              </div>


              {/* TENURE */}

              <div className="mt-5">

                <label className="mb-2 block font-semibold text-[#291C0E]">
                  Loan Tenure (Years)
                </label>

                <input
                  type="number"
                  value={tenure}
                  onChange={(e) => setTenure(e.target.value)}
                  placeholder="Example: 10"
                  className="w-full rounded-xl border border-[#D8C8B8] bg-white px-4 py-3 text-[#291C0E] outline-none focus:border-[#6E473B] focus:ring-2 focus:ring-[#C9A66B]/30"
                />

              </div>


              {/* BUTTON */}

              <button
                onClick={calculateEMI}
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-[#6E473B] px-6 py-3.5 font-bold text-[#F7F1E7] transition hover:-translate-y-1 hover:bg-[#815547]"
              >
                <Calculator size={19} />
                Calculate EMI
              </button>

            </div>


            {/* RESULT CARD */}

            <div className="rounded-3xl bg-[#291C0E] p-8 shadow-lg">

              <p className="text-sm font-bold tracking-[0.2em] text-[#C9A66B]">
                YOUR EMI
              </p>

              <h2 className="mt-3 text-4xl font-black text-[#F7F1E7]">
                {emi ? formatCurrency(emi) : "₹0"}
              </h2>

              <p className="mt-2 text-[#CDBBAA]">
                Estimated monthly payment
              </p>


              {/* TOTAL INTEREST */}

              <div className="mt-8 rounded-2xl border border-[#6E473B] bg-[#3B291B] p-5">

                <p className="text-sm text-[#CDBBAA]">
                  Total Interest
                </p>

                <p className="mt-2 text-2xl font-bold text-[#F7F1E7]">
                  {formatCurrency(totalInterest)}
                </p>

              </div>


              {/* TOTAL PAYMENT */}

              <div className="mt-4 rounded-2xl border border-[#6E473B] bg-[#3B291B] p-5">

                <p className="text-sm text-[#CDBBAA]">
                  Total Amount Payable
                </p>

                <p className="mt-2 text-2xl font-bold text-[#F7F1E7]">
                  {formatCurrency(totalAmount)}
                </p>

              </div>


              {/* PRINCIPAL */}

              <div className="mt-4 rounded-2xl border border-[#C9A66B]/40 bg-[#3B291B] p-5">

                <p className="text-sm text-[#CDBBAA]">
                  Loan Principal
                </p>

                <p className="mt-2 text-2xl font-bold text-[#C9A66B]">
                  {formatCurrency(Number(loanAmount) || 0)}
                </p>

              </div>

            </div>

          </div>


          {/* BACK BUTTON */}

          <div className="mt-8 text-center">

            <Link
              to="/"
              className="inline-flex items-center gap-2 font-semibold text-[#6E473B] hover:text-[#291C0E]"
            >
              <ArrowLeft size={17} />
              Back to Home
            </Link>

          </div>

        </div>

      </div>
    
  );
};

export default EMICalculator;