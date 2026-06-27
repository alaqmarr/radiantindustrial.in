import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const contactsCount = await prisma.contact.count();
  const templatesCount = await prisma.template.count();
  const tagsCount = await prisma.tag.count();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white tracking-tight">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-sm">
          <h3 className="text-slate-400 text-sm font-medium mb-1">Total Contacts</h3>
          <p className="text-4xl font-bold text-white">{contactsCount}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-sm">
          <h3 className="text-slate-400 text-sm font-medium mb-1">Total Templates</h3>
          <p className="text-4xl font-bold text-white">{templatesCount}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-sm">
          <h3 className="text-slate-400 text-sm font-medium mb-1">Active Tags</h3>
          <p className="text-4xl font-bold text-white">{tagsCount}</p>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl mt-8">
        <h2 className="text-xl font-bold text-white mb-4">Getting Started</h2>
        <p className="text-slate-400 max-w-2xl">
          Welcome to the new Radiant Admin CRM. Here you can manage your contacts, create beautiful email and WhatsApp templates, and run marketing campaigns.
        </p>
        <div className="mt-6 flex gap-4">
          <a href="/admin/lists" className="bg-brand-orange text-white px-5 py-2.5 rounded-lg font-medium hover:bg-orange-600 transition-colors">
            Manage Contacts
          </a>
          <a href="/admin/templates" className="bg-slate-800 text-white px-5 py-2.5 rounded-lg font-medium border border-slate-700 hover:bg-slate-700 transition-colors">
            Create Template
          </a>
        </div>
      </div>
    </div>
  );
}
