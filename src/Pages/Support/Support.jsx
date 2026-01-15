import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { HelpCircle, Search, ChevronDown, ChevronUp, MessageCircle } from "lucide-react";

const fetchFAQs = async () => {
    const res = await fetch("http://localhost:3000/faqs"); // replace with your backend URL
    if (!res.ok) throw new Error("Failed to fetch FAQs");
    return res.json();
};

const Support = () => {
    const [openId, setOpenId] = useState(null);
    const [search, setSearch] = useState("");

    const { data: faqs, isLoading } = useQuery({
        queryKey: ["faqs"],
        queryFn: fetchFAQs,
    });


    const filtered = faqs?.filter(
        (f) =>
            f.question.toLowerCase().includes(search.toLowerCase()) ||
            f.answer.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="bg-white support min-h-screen py-20 px-4 sm:px-6 lg:px-8 section">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center p-3 bg-primary-100 rounded-2xl mb-6">
                        <HelpCircle className="w-8 h-8 text-primary-600" />
                    </div>
                    <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
                        How can we <span className="text-[#FFAA6E]">help</span>?
                    </h1>
                    <p className="mt-4 text-xl text-gray-600">
                        Search our knowledge base or browse common questions below.
                    </p>

                    {/* Search Input */}
                    <div className="mt-8 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search for help articles..."
                            className="w-full pl-12 pr-4 py-4 border-2 border-gray-100 rounded-2xl focus:border-primary-500 outline-none text-lg transition-all"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                {/* FAQ List */}
                {isLoading ? (
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-16 bg-gray-50 rounded-xl animate-pulse"></div>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filtered?.map((faq) => (
                            <div
                                key={faq._id}
                                className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm"
                            >
                                <button
                                    onClick={() => setOpenId(openId === faq._id ? null : faq._id)}
                                    className="w-full flex items-center justify-between p-6 bg-white hover:bg-gray-50 transition-colors"
                                >
                                    <div className="text-left">
                                        <span className="text-xs font-bold text-primary-600 uppercase tracking-widest">
                                            {faq.category}
                                        </span>
                                        <h3 className="text-lg font-bold text-gray-900 mt-1">{faq.question}</h3>
                                    </div>
                                    {openId === faq._id ? (
                                        <ChevronUp className="w-5 h-5 text-gray-400" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-gray-400" />
                                    )}
                                </button>
                                {openId === faq._id && (
                                    <div className="p-6 bg-gray-50 text-gray-700 leading-relaxed border-t border-gray-100">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Contact Support Section */}
                <div className="mt-20 p-8 bg-slate-900 rounded-3xl text-center text-white">
                    <h3 className="text-2xl font-bold mb-2">Still have questions?</h3>
                    <p className="text-slate-400 mb-8">
                        Our support team is always here to assist you with any issues.
                    </p>
                    <button className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-500 text-white px-8 py-3 rounded-xl font-bold transition">
                        <MessageCircle className="w-5 h-5" /> Contact Support
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Support;
