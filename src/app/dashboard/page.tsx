import { AuthStorageChecker } from "@/components/builds/test/AuthStorageChecker"
import { ProductStorageChecker } from "@/components/builds/test/ProductStorageChecker"
import { ProfileStorageChecker } from "@/components/builds/test/ProfileStorageChecker"
import { GridBox } from "@/components/containers/GridBox"

export default function HomePage() {
  return (
    <main>
      <GridBox>
        <AuthStorageChecker />
        <ProfileStorageChecker />
        <ProductStorageChecker />
      </GridBox>
    </main>
  )
}
