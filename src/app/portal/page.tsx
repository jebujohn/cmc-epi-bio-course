import PortalLoginForm from "./PortalLoginForm";

export const metadata = {
    title: "Participant Portal | 46th Epidemiology Refresher Course",
};

export default async function PortalPage({
    searchParams,
}: {
    searchParams: Promise<{ error?: string }>;
}) {
    const { error } = await searchParams;
    return <PortalLoginForm errorParam={error} />;
}
