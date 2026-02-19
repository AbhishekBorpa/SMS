export default function LegalPage() {
    return (
        <main className="min-h-screen bg-slate-50 pt-24 pb-20 text-slate-900">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-black mb-8">Legal & Privacy</h1>

                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 mb-8">
                    <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
                    <p className="text-slate-600 mb-4">
                        At Cortex K-12, we take data privacy seriously. Inspecting our infrastructure, we allow zero unauthorized access to student records.
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-slate-600">
                        <li>We do not sell student data to third parties.</li>
                        <li>All data is encrypted in transit and at rest (AES-256).</li>
                        <li>Schools retain full ownership of their data.</li>
                    </ul>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
                    <h2 className="text-2xl font-bold mb-4">Terms of Service</h2>
                    <p className="text-slate-600 mb-4">
                        By using the Cortex K-12 platform, you agree to the following terms:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-slate-600">
                        <li>The platform is licensed on a per-student basis.</li>
                        <li>Unauthorized sharing of account credentials is prohibited.</li>
                        <li>We guarantee 99.9% uptime for the service.</li>
                    </ul>
                </div>
            </div>
        </main>
    );
}
