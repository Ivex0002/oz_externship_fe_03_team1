import { BasicInput } from '@/components/basicComponents/input/BasicInput'

export default function TestG() {
  return (
    <div className="mx-auto w-[567px] p-4">
      <BasicInput status="default" label="default" placeholder="placeholder" />
      <BasicInput
        status="focus"
        label="focus"
        placeholder="example@email.com"
      />
      <BasicInput status="error" label="error" placeholder="placeholder" />
      <BasicInput
        status="disabled"
        label="disabled"
        placeholder="placeholder"
      />
    </div>
  )
}
