import { capitalizeFirstLetter } from "@/lib/capitalize-first";
import { BoxIcon } from "lucide-react";
import { HeaderPoint } from "./header-point";
import { Business } from "@prisma/client";
import { valueFormat } from "@/lib/utils";
import { Item } from "@/components/item";

type Props = {
  business: Business | null;
};

const SubmissionBusiness = ({ business }: Props) => {
  if (!business) {
    return;
  }

  return (
    <div className="flex flex-col gap-4">
      <HeaderPoint
        icon={BoxIcon}
        title={business?.name}
        description={business?.sector + " - " + business?.businessType}
      />
      {/* Deskripsi */}
      <p>{capitalizeFirstLetter(business?.description)}</p>

      <div className="grid gap-4 grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))]">
        <ul className="flex flex-col gap-1 text-sm text-muted-foreground capitalize">
          <Item title="Alamat" value={business.address} />
          <Item title="Provinsi" value={business.province} />
          <Item title="Kota/Kabupaten" value={business.city} />
          <Item title="Kelurahan" value={business.district} />
          <Item title="Kecamatan" value={business.village} />
          <Item title="Kode Pos" value={business.postalCode} />
        </ul>
        <ul className="flex flex-col gap-1 text-sm text-muted-foreground capitalize">
          <Item title="NIB" value={business.nib} />
          <Item title="Sector" value={business.sector} />
          <Item title="Business Type" value={business.businessType} />
          <Item title="Produk Utama" value={business.mainProduct} />
          <Item title="Building Type" value={business.buildingType} />
          <Item title="Ownership Status" value={business.ownershipStatus} />
        </ul>

        <ul className="flex flex-col gap-1 text-sm text-muted-foreground capitalize">
          <Item title="Marketing Area" value={business.marketingArea} />
          <Item title="Marketing Chanel" value={business.marketingChannel} />
          <Item title="Marketing Country" value={business.marketingCountry} />
        </ul>
        <ul className="flex flex-col gap-1 text-sm text-muted-foreground capitalize">
          <Item title="Partner" value={business.partnerDescription} />
          <Item title="Partner Count" value={business.partnerCount} />
        </ul>

        <ul className="flex flex-col gap-1 text-sm text-muted-foreground capitalize">
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

export default SubmissionBusiness;
