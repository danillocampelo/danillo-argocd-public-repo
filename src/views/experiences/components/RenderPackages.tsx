import { Package } from '@models/Package'
import HighlightPackage from './HighlightPackage'
import PackageCard from '@components/molecules/PackageCard'

export const renderPackages: any = (
  experiencePackages: Package[] | undefined,
) => {
  const sharedGridClasses =
    'grid grid-cols-1 mb-9 gap-[2.25rem] md:mb-11 md:gap-11'

  if (!experiencePackages || experiencePackages.length == 0) {
    return (
      <h1 className="text-white-bone">Experiencia sem pacotes cadastrados</h1>
    )
  } else {
    switch (experiencePackages.length) {
      case 1:
        return (
          <div className={`${sharedGridClasses} md:grid-cols-4`}>
            {<HighlightPackage packageData={experiencePackages[0]} />}
          </div>
        )
      case 2:
        return (
          <div className={`${sharedGridClasses} md:grid-cols-2`}>
            {<PackageCard packageData={experiencePackages[0]} />}
            {<PackageCard packageData={experiencePackages[1]} />}
          </div>
        )
      case 3:
        return (
          <div className={`${sharedGridClasses} md:grid-cols-4`}>
            {<PackageCard packageData={experiencePackages[0]} />}
            {<PackageCard packageData={experiencePackages[1]} />}
            {
              <PackageCard
                className="md:col-span-2"
                packageData={experiencePackages[2]}
              />
            }
          </div>
        )
      case 4:
        return (
          <div className={`${sharedGridClasses} md:grid-cols-4`}>
            {<PackageCard packageData={experiencePackages[0]} />}
            {<PackageCard packageData={experiencePackages[1]} />}
            {<PackageCard packageData={experiencePackages[2]} />}
            {<PackageCard packageData={experiencePackages[3]} />}
          </div>
        )
      case 5:
        return (
          <>
            {renderPackages(experiencePackages.slice(0, 3))}
            {renderPackages(experiencePackages.slice(-2))}
          </>
        )
      case 6:
        return (
          <div className={`${sharedGridClasses} md:grid-cols-4`}>
            {
              <PackageCard
                className="md:col-span-2"
                packageData={experiencePackages[0]}
              />
            }
            {<PackageCard packageData={experiencePackages[1]} />}
            {<PackageCard packageData={experiencePackages[2]} />}
            {<PackageCard packageData={experiencePackages[3]} />}
            {<PackageCard packageData={experiencePackages[4]} />}
            {
              <PackageCard
                className="md:col-span-2"
                packageData={experiencePackages[5]}
              />
            }
          </div>
        )
      case 7:
        return (
          <>
            {renderPackages(experiencePackages.slice(0, 4))}
            {renderPackages(experiencePackages.slice(-3))}
          </>
        )
      default:
        return (
          <>
            {renderPackages(experiencePackages.slice(0, 6))}
            {renderPackages(experiencePackages.slice(6))}
          </>
        )
    }
  }
}
