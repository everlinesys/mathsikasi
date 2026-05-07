import { useBranding } from "../../shared/hooks/useBranding";

export default function Team() {
  const brand = useBranding();
  const team = brand.team || [];

  return (
    <section className={`${brand.theme.layout.container } md:px-16`} >
      <div className={`${brand.theme.layout.container } py-16 md:py-24  `}>

        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <p className={brand.theme.text?.label}>
            Leadership
          </p>

          <h2 className={brand.theme.text?.title}>
            Meet the Team Behind {brand.siteName}
          </h2>

          <p className={brand.theme.text?.body}>
            Dedicated professionals committed to shaping a strong foundation for every child.
          </p>
        </div>

        {/* Members */}
        <div className="space-y-20">

          {team.slice(0, 2).map((member, index) => {
            const isReverse = index % 2 !== 0;

            return (
              <div
                key={index}
                className={`grid md:grid-cols-2 gap-10 items-center`}
              >

                {/* Image */}
                <div className={`${isReverse ? "md:order-2" : ""}`}>
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className={`w-full max-w-md mx-auto object-cover ${brand.theme.shape.cardRadius}`}
                    />
                  ) : (
                    <div
                      className={`w-full h-[300px] flex items-center justify-center ${brand.theme.layout.panel} ${brand.theme.shape.cardRadius}`}
                    >
                      <span className="text-4xl font-bold text-gray-400">
                        {member.name?.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Text */}
                <div className={`space-y-4 text-center md:text-left ${isReverse ? "md:order-1" : ""}`}>

                  <p className={brand.theme.text?.label}>
                    {member.role}
                  </p>

                  <h3 className="text-2xl sm:text-3xl font-bold">
                    {member.name}
                  </h3>

                  <p className={brand.theme.text?.body}>
                    {member.qualification}
                  </p>

                </div>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}