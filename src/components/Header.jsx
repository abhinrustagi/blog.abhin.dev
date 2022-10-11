import { Container } from "./Container";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="w-full border-b-zinc-700 border-b py-5">
      <Container>
        <p className="font-mono font-bold text-lg">
          <Link href="/" passHref>
            <a>
              <span className="text-amber-400">blog</span>.abhin.dev
            </a>
          </Link>
        </p>
      </Container>
    </header>
  );
};
