import { getEmployerApplications } from "@/app/actions/getEmployerApplications";
import EmployerApplication from "@/components/EmployerApplication/EmployerApplication";
import { EmployerApplicationType } from "@/types/user";
import styles from "./ApplicationsReceived.module.css";
import FilterApplication from "@/components/FilterApplication/FilterApplication";
import LoaderSpinner from "@/components/LoaderSpinner/LoaderSpinner";

export const dynamic = "force-dynamic";

const ApplicationsReceived = async () => {
  const employerApplications: EmployerApplicationType[] | undefined =
    await getEmployerApplications();

  if (!employerApplications) {
    return <LoaderSpinner />;
  }

  if (employerApplications.length === 0) {
    return <div>Aucune candidature n'a été recu pour cette offre.</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Candidatures recues suite à vos offres</h1>
        <FilterApplication />
      </div>
      <section className={styles.applications}>
        {employerApplications?.map((application) => (
          <EmployerApplication
            applicationId={application._id}
            jobTitle={application.jobOffer.jobTitle}
            jobCompany={application.jobOffer.companyName}
            jobId={application.jobOffer._id}
            applicationFirstName={application.firstName}
            applicationLastName={application.lastName}
            applicationEmail={application.email}
            applicationPhone={application.phone}
            applicationCv={application.cv}
            applicationCoverLetter={application.coverLetter}
            applicationStatus={application.status}
            senderUsername={application.sender.username}
            senderImage={application.sender.image!}
            senderId={application.sender._id}
          />
        ))}
      </section>
    </div>
  );
};

export default ApplicationsReceived;
