import { motion } from 'framer-motion';

export default function Settings() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 md:p-10"
    >
      <h1 className="text-3xl font-bold mb-8">Settings</h1>
      <div className="max-w-xl space-y-6">
        <div className="bg-card p-6 rounded-xl border border-border">
          <h2 className="text-xl font-semibold mb-4">Appearance</h2>
          <p className="text-muted-foreground text-sm">Theme customization will be available soon.</p>
        </div>
        <div className="bg-card p-6 rounded-xl border border-border">
          <h2 className="text-xl font-semibold mb-4">Audio Quality</h2>
          <p className="text-muted-foreground text-sm">High quality streaming is enabled by default.</p>
        </div>
      </div>
    </motion.div>
  );
}
