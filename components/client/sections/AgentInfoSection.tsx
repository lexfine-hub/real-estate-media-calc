import { QuoteRequest, PreferredContactMethod } from '@/lib/types';

interface Props {
  formData: QuoteRequest;
  setFormData: (data: QuoteRequest) => void;
}

export default function AgentInfoSection({ formData, setFormData }: Props) {
  const updateAgentInfo = (field: string, value: any) => {
    setFormData({
      ...formData,
      agentInfo: {
        ...formData.agentInfo,
        [field]: value,
      },
    });
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-8 border border-slate-200">
      <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-yellow-400 text-white rounded-full flex items-center justify-center font-bold text-sm">
          1
        </div>
        Agent Information
      </h2>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Agent Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.agentInfo.name}
              onChange={(e) => updateAgentInfo('name', e.target.value)}
              placeholder="Your full name"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">Brokerage</label>
            <input
              type="text"
              value={formData.agentInfo.brokerage}
              onChange={(e) => updateAgentInfo('brokerage', e.target.value)}
              placeholder="Your brokerage name"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={formData.agentInfo.email}
              onChange={(e) => updateAgentInfo('email', e.target.value)}
              placeholder="your.email@example.com"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={formData.agentInfo.phone}
              onChange={(e) => updateAgentInfo('phone', e.target.value)}
              placeholder="(555) 123-4567"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-3">
            Preferred Contact Method <span className="text-red-500">*</span>
          </label>
          <div className="space-y-2">
            {(['email', 'phone', 'text'] as PreferredContactMethod[]).map((method) => (
              <label key={method} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="contact"
                  value={method}
                  checked={formData.agentInfo.preferredContact === method}
                  onChange={(e) => updateAgentInfo('preferredContact', e.target.value)}
                  className="w-4 h-4 text-yellow-400 rounded focus:ring-2 focus:ring-yellow-400"
                />
                <span className="text-slate-700 capitalize">{method}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
