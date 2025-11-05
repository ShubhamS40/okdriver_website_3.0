'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Check, ArrowRight, Globe, Users, Building2 } from 'lucide-react';

export default function PlansPage() {
  const [companyPlans, setCompanyPlans] = useState([]);
  const [driverPlans, setDriverPlans] = useState([]);
  const [apiPlans, setApiPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
    const fetchPlans = async () => {
      try {
        const [companyRes, driverRes, apiRes] = await Promise.all([
          fetch('/api/plans/list'),
          fetch('/api/driver-plans/list'),
          fetch('/api/api-plans/list')
        ]);

        const [companyData, driverData, apiData] = await Promise.all([
          companyRes.json(), driverRes.json(), apiRes.json()
        ]);

        if (!companyRes.ok) throw new Error(companyData?.message || 'Failed to load company plans');
        if (!driverRes.ok) throw new Error(driverData?.message || 'Failed to load driver plans');
        if (!apiRes.ok) throw new Error(apiData?.message || 'Failed to load API plans');

        if (isMounted) {
          setCompanyPlans(Array.isArray(companyData) ? companyData : []);
          setDriverPlans(Array.isArray(driverData) ? driverData : []);
          setApiPlans(Array.isArray(apiData) ? apiData : []);
        }
      } catch (e) {
        if (isMounted) setError(e.message || 'Failed to load plans');
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchPlans();
    return () => { isMounted = false };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <section className="pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">Plans & Pricing</h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">Choose the plan that fits your needs. Simple, transparent pricing for companies, individual drivers, and API usage.</p>
        </div>
      </section>

      {/* Company Plans */}
      <section className="py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-8">
            <Building2 className="w-6 h-6 mr-3 text-white" />
            <h2 className="text-3xl font-bold">Company Plans</h2>
          </div>

          {loading ? (
            <div className="text-gray-400">Loading plans...</div>
          ) : error ? (
            <div className="text-red-400">{error}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {companyPlans.map((plan, idx) => (
                <div key={idx} className="relative group rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-colors">
                  <div className="mb-3 flex items-baseline justify-between">
                    <h3 className="text-xl font-semibold">{plan?.name || 'Plan'}</h3>
                    <span className="text-sm text-gray-400 uppercase tracking-wider">{plan?.planType || 'SUBSCRIPTION'}</span>
                  </div>
                  <div className="text-3xl font-extrabold mb-1 text-white">
                    {plan?.price ? `₹${Number(plan.price).toLocaleString('en-IN')}` : '₹—'}
                  </div>
                  <p className="text-gray-400 text-sm mb-4">{plan?.description || '—'}</p>
                  {Array.isArray(plan?.keyAdvantages) && plan.keyAdvantages.length > 0 && (
                    <ul className="space-y-2 mb-6">
                      {plan.keyAdvantages.slice(0, 6).map((f, i) => (
                        <li key={i} className="flex items-start text-sm text-gray-300">
                          <Check className="w-4 h-4 mr-2 text-white flex-shrink-0 mt-0.5" /> {f}
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="flex items-center justify-between">
                    <Link href="/company/login" className="inline-flex items-center px-4 py-2 rounded-full bg-white text-black font-semibold hover:bg-gray-100 transition-colors">
                      Get Started <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                    {(plan?.vehicleLimit || plan?.clientLimit) && (
                      <div className="text-xs text-gray-400">
                        {plan.vehicleLimit ? `${plan.vehicleLimit} vehicles` : ''}
                        {plan.vehicleLimit && plan.clientLimit ? ' • ' : ''}
                        {plan.clientLimit ? `${plan.clientLimit} clients` : ''}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Driver Plans */}
      <section className="py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-8">
            <Users className="w-6 h-6 mr-3 text-white" />
            <h2 className="text-3xl font-bold">Individual Driver Plans</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {driverPlans.map((plan, idx) => (
              <div key={idx} className={`relative group rounded-2xl border border-white/10 p-6 transition-colors ${plan.highlight ? 'bg-white text-black' : 'bg-white/5 hover:bg-white/10 text-white'}`}>
                <div className="mb-3">
                  <h3 className={`text-xl font-semibold ${plan.highlight ? 'text-black' : 'text-white'}`}>{plan.name || 'Plan'}</h3>
                </div>
                <div className={`text-3xl font-extrabold mb-1 ${plan.highlight ? 'text-black' : 'text-white'}`}>{plan.price ? `₹${Number(plan.price).toLocaleString('en-IN')}` : '₹—'}</div>
                <p className={`text-sm mb-4 ${plan.highlight ? 'text-gray-700' : 'text-gray-400'}`}>{plan.description || '—'}</p>
                <ul className="space-y-2 mb-6">
                  {(Array.isArray(plan.features) ? plan.features : plan.benefits || []).slice(0,6).map((f, i) => (
                    <li key={i} className={`flex items-start text-sm ${plan.highlight ? 'text-black' : 'text-gray-300'}`}>
                      <Check className={`w-4 h-4 mr-2 flex-shrink-0 mt-0.5 ${plan.highlight ? 'text-black' : 'text-white'}`} /> {f}
                    </li>
                  ))}
                </ul>
                <a href="https://play.google.com/store/apps/details?id=app.dash.okDriver" target="_blank" rel="noopener noreferrer" className={`inline-flex items-center px-4 py-2 rounded-full font-semibold transition-colors ${plan.highlight ? 'bg-black text-white hover:bg-gray-900' : 'bg-white text-black hover:bg-gray-100'}`}>
                  Get Started <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* API Plans */}
      <section className="py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-8">
            <Globe className="w-6 h-6 mr-3 text-white" />
            <h2 className="text-3xl font-bold">API Plans</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {apiPlans.map((plan, idx) => (
              <div key={idx} className={`relative group rounded-2xl border border-white/10 p-6 transition-colors ${plan.highlight ? 'bg-white text-black' : 'bg-white/5 hover:bg-white/10 text-white'}`}>
                <div className="mb-3">
                  <h3 className={`text-xl font-semibold ${plan.highlight ? 'text-black' : 'text-white'}`}>{plan.name || 'Plan'}</h3>
                </div>
                <div className={`text-3xl font-extrabold mb-1 ${plan.highlight ? 'text-black' : 'text-white'}`}>{plan.price ? `₹${Number(plan.price).toLocaleString('en-IN')}` : (plan.currency ? `${plan.currency} —` : '₹—')}</div>
                <p className={`text-sm mb-4 ${plan.highlight ? 'text-gray-700' : 'text-gray-400'}`}>{plan.description || '—'}</p>
                <ul className="space-y-2 mb-6">
                  {(Array.isArray(plan.features) ? plan.features : []).slice(0,6).map((f, i) => (
                    <li key={i} className={`flex items-start text-sm ${plan.highlight ? 'text-black' : 'text-gray-300'}`}>
                      <Check className={`w-4 h-4 mr-2 flex-shrink-0 mt-0.5 ${plan.highlight ? 'text-black' : 'text-white'}`} /> {f}
                    </li>
                  ))}
                </ul>
                <Link href="/user/login" className={`inline-flex items-center px-4 py-2 rounded-full font-semibold transition-colors ${plan.highlight ? 'bg-black text-white hover:bg-gray-900' : 'bg-white text-black hover:bg-gray-100'}`}>
                  Get Started <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}


