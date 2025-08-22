import {GlassFormField} from '/snippets/components/glass-form-field.jsx'

export const InputExample = () => (
  <div className="not-prose space-y-2">
    <GlassFormField label="Email">
      <input type="email" placeholder="you@example.com" className="w-full" />
    </GlassFormField>
    <GlassFormField label="Password">
      <input type="password" placeholder="••••••••" className="w-full" />
    </GlassFormField>
  </div>
)

export default InputExample
