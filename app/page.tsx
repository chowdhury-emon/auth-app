import Link from "next/link";
import { TiArrowRightThick } from "react-icons/ti";

export default function Home() {
  return (
    <div>
      <section className="grid place-items-center h-full py-8">
        <div className="w-max">
          <h1 className="text-7xl/snug font-bold">Learn BetterAuth Setup </h1>
          <h2 className="text-right">
            with
            <span className="highlight ml-2 inline-block rounded-full">MongoDB</span>
          </h2>

          <button className="highlight grid place-self-center mt-12 text-2xl font-semibold rounded-2xl p-2 px-4 animate-bounce hover:paused">
            <Link href={'/setup'} className="flex items-center gap-2"> <TiArrowRightThick /> Get Started </Link>
          </button>
        </div>
      </section>
    </div>
  )
}