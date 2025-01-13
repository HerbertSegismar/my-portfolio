
type Props = {}

export default function Header({}: Props) {
  return (
    <div className="bg-black/90 w-screen ~h-8/32 flex items-center p-4 absolute left-0 right-0 top-0">
        <div>
            <img src="/herb_segis.svg" className="~w-32/64"/>
        </div>
    </div>
  )
}