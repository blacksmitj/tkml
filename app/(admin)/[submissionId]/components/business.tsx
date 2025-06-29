import { capitalizeFirstLetter } from "@/lib/capitalize-first";
import { BoxIcon } from "lucide-react";
import { HeaderPoint } from "./header-point";
import { Business } from "@prisma/client";
import { valueFormat } from "@/lib/utils";
import { Item } from "@/components/item";

type Props = {
  business: Business | null;
};

const business = ({ business }: Props) => {
  if (!business) {
    return;
  }

  return (
    <div className="flex flex-col gap-8">
      <HeaderPoint
        icon={BoxIcon}
        title={business?.name}
        description={business?.sector + " - " + business?.businessType}
      />
      {/* Deskripsi */}
      <p>{capitalizeFirstLetter(business?.description)}</p>

      <div className="grid gap-10 grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))]">
        <ul className="flex flex-col gap-4 text-sm text-muted-foreground capitalize border-l pl-4 h-fit">
          <Item title="NIB" value={business.nib} />
          <Item title="Sector" value={business.sector} />
          <Item title="Business Type" value={business.businessType} />
          <Item title="Produk Utama" value={business.mainProduct} />
          <Item title="Building Type" value={business.buildingType} />
          <Item title="Ownership Status" value={business.ownershipStatus} />
        </ul>

        <ul className="flex flex-col gap-4 text-sm text-muted-foreground capitalize border-l pl-4 h-fit">
          <Item title="Marketing Area" value={business.marketingArea} />
          <Item title="Marketing Chanel" value={business.marketingChannel} />
          <Item title="Marketing Country" value={business.marketingCountry} />
        </ul>
        <ul className="flex flex-col gap-4 text-sm text-muted-foreground capitalize border-l pl-4 h-fit">
          <Item title="Partner" value={business.partnerDescription} />
          <Item title="Partner Count" value={business.partnerCount} />
        </ul>

        <ul className="flex flex-col gap-4 text-sm text-muted-foreground capitalize border-l pl-4 h-fit">
          <Item title="Omzet Perbulan" value={business.omzetPerMonth} />
          <Item title="Profit Perbulan" value={business.profitPerMonth} />
          <Item
            title="Unit Terjual Perbulan"
            value={business.unitsSoldPerMonth}
          />
        </ul>
      </div>
    </div>
  );
};

export default business;
