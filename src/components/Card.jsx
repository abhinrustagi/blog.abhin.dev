/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

export const Card = ({ title, desc, thumbnail, slug, type, date }) => {
  return (
    <div className="flex mb-10">
      <div className="block mr-5 rounded-md w-20 h-16 relative overflow-hidden">
        <img
          src={thumbnail}
          alt={slug}
          className="object-cover object-left h-full"
        />
      </div>
      <div className="flex-1">
        <Link href={`/${slug}`} passHref>
          <a>
            <h3 className="font-medium text-2xl hover:text-amber-400">
              {title}
            </h3>
          </a>
        </Link>
        <p className="my-3 text-sm text-gray-300 leading-normal">
          {desc.slice(0, 150)}...
        </p>
        <p className="text-gray-400 font-mono font-bold">
          {[date, type].join("  •   ")}
        </p>
      </div>
    </div>
  );
};
