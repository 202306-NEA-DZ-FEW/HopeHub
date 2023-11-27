import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    query,
    where,
} from "firebase/firestore";
import Head from "next/head";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

import Blogs from "@/components/AdminDashboard/Blogs";
import BlogsEdit from "@/components/AdminDashboard/BlogsEdit";
import Patients from "@/components/AdminDashboard/Patients";
import ReceivedEmails from "@/components/AdminDashboard/ReceivedEmails";
import Therapists from "@/components/AdminDashboard/Therapists";
import Bar from "@/components/Charts/Bar";
import Pie from "@/components/Charts/Pie";
import SingleDate from "@/components/Charts/SingleDate";
import Widget from "@/components/Charts/Widget";

// import { Patient, Therapist } from "@/util/constants";
import { db } from "@/util/firebase";
import Jobs from "@/components/AdminDashboard/Jobs";
import JobsEdit from "@/components/AdminDashboard/JobsEdit";

export default function AdminDashboard({
    Allblogs: initialBlogs,
    users,
    datesBarData,
    blogsCount,
    patientsCount,
    therapistsCount,
    newsletterCount,
    datesAppointments,
    receivedEmails,
    contactTypes,
    emails,
    AllJobs: initialJobs,
    jobsCount,
}) {
    const { t } = useTranslation("common");
    // const [emails, setEmails] = useState([]);
    const [visibleSection, setVisibleSection] = useState("dashboard");
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [blogs, setBlogs] = useState(initialBlogs);
    const [jobs, setJobs] = useState(initialJobs); // Initialize with initial job data fetched from Firestore
    const [selectedJob, setSelectedJob] = useState(null);
    const [isJobsDropdownOpen, setIsJobsDropdownOpen] = useState(false);
    const [patients, setPatients] = useState(
        users.filter((user) => !user.isTherapist)
    ); // Initialize state with initial patients
    const [therapists, setTherapists] = useState(
        users.filter((user) => user.isTherapist)
    );
    const [isBlogsDropdownOpen, setIsBlogsDropdownOpen] = useState(false); // Correct the variable name
    const [selectedDate, setSelectedDate] = useState("");
    const handleSectionToggle = (section) => {
        setVisibleSection(section);
    };
    // const Patient = users.filter((user) => !user.isTherapist);
    // const Therapist = users.filter((user) => user.isTherapist);
    const toggleDropdown = (dropdown) => {
        if (dropdown === "users") {
            setIsUserDropdownOpen(!isUserDropdownOpen);
        } else if (dropdown === "blogs") {
            setIsBlogsDropdownOpen(!isBlogsDropdownOpen); // Correct the variable name
        } else if (dropdown === "Jobs") {
            setIsJobsDropdownOpen(!isJobsDropdownOpen); // Toggling the Jobs dropdown state
        }
    };

    const handleEditBlog = (blog) => {
        // Set the selected blog in the state
        setSelectedBlog(blog);
        // Switch to the 'Blogs Edit' section
        setVisibleSection("Blogs Edit");
    };

    const handleDeleteBlog = async (blog) => {
        try {
            // Delete the blog from Firestore
            const blogRef = doc(collection(db, "blogs"), blog.id);
            await deleteDoc(blogRef);

            // Update the state to remove the deleted blog
            const updatedBlogs = blogs.filter((b) => b.id !== blog.id);
            setBlogs(updatedBlogs);

            // Handle any additional logic after deletion if needed
            console.log("Blog deleted successfully!");
        } catch (error) {
            console.error("Error deleting blog:", error);
            throw error;
        }
    };

    const handleEditJob = (job) => {
        // Set the selected blog in the state
        setSelectedJob(job);
        // Switch to the 'Blogs Edit' section
        setVisibleSection("Edit Jobs");
    };

    const handleDeleteJob = async (job) => {
        try {
            // Delete the blog from Firestore
            const jobRef = doc(collection(db, "jobs"), job.id);
            await deleteDoc(jobRef);

            // Update the state to remove the deleted blog
            const updatedJobs = jobs.filter((j) => j.id !== job.id);
            setJobs(updatedJobs);

            // Handle any additional logic after deletion if needed
            console.log("Job deleted successfully!");
        } catch (error) {
            console.error("Error deleting Job:", error);
            throw error;
        }
    };

    const handleDeletePatient = async (patient) => {
        try {
            console.log("im patient", patient);

            // Check if the patient has a uid
            if (patient.uid) {
                // Delete the patient from Firestore using uid
                const patientRef = doc(collection(db, "users"), patient.uid);
                await deleteDoc(patientRef);
            } else {
                // Fetch all documents and filter based on some condition
                const querySnapshot = await getDocs(collection(db, "users"));
                const docToDelete = querySnapshot.docs.find((doc) => {
                    // Customize this logic based on your requirements
                    // In this example, I'm checking if all key-value pairs match
                    const patientData = doc.data();
                    return Object.keys(patient).every(
                        (key) => patientData[key] === patient[key]
                    );
                });
                if (docToDelete) {
                    await deleteDoc(docToDelete.ref);
                } else {
                    console.error("User not found for deletion:", patient);
                    return;
                }
            }
            // Fetch the updated collection after deletion
            const q = query(
                collection(db, "users"),
                where("isTherapist", "==", false)
            );
            const updatedPatientsSnapshot = await getDocs(q);
            const updatedPatients = updatedPatientsSnapshot.docs.map((doc) =>
                doc.data()
            );

            // Update the state with the new collection
            setPatients(updatedPatients);

            // Verify the state immediately after the update
            console.log("State after update:", patients);

            // Handle any additional logic after deletion if needed
            console.log("Patient deleted successfully!");
        } catch (error) {
            console.error("Error deleting patient:", error);
            console.log("im a patient", patient);
            throw error;
        }
    };

    const handleDeleteTherapist = async (therapist) => {
        try {
            console.log("im patient", therapist);

            // Check if the patient has a uid
            if (therapist.uid) {
                // Delete the patient from Firestore using uid
                const therapistRef = doc(
                    collection(db, "users"),
                    therapist.uid
                );
                await deleteDoc(therapistRef);
            } else {
                // Fetch all documents and filter based on some condition
                const querySnapshot = await getDocs(collection(db, "users"));
                const docToDelete = querySnapshot.docs.find((doc) => {
                    // Customize this logic based on your requirements
                    // In this example, I'm checking if all key-value pairs match
                    const therapistData = doc.data();
                    return Object.keys(therapist).every(
                        (key) => therapistData[key] === therapist[key]
                    );
                });

                if (docToDelete) {
                    await deleteDoc(docToDelete.ref);
                } else {
                    console.error("User not found for deletion:", therapist);
                    return;
                }
            }
            // Fetch the updated collection after deletion
            const q = query(
                collection(db, "users"),
                where("isTherapist", "==", true)
            );
            const updatedTherapistsSnapshot = await getDocs(q);
            const updatedTherapists = updatedTherapistsSnapshot.docs.map(
                (doc) => doc.data()
            );

            // Update the state with the new collection
            setTherapists(updatedTherapists);

            // Verify the state immediately after the update
            console.log("State after update:", therapists);

            // Handle any additional logic after deletion if needed
            console.log("Therapist deleted successfully!");
        } catch (error) {
            console.error("Error deleting therapist:", error);
            console.log("im a therapist", therapist);
            throw error;
        }
    };

    return (
        <div className='flex h-fit  '>
            <Head>
                <title>Admin</title>
            </Head>
            <div className=' font-poppins pb-64 text-NeutralBlack bg-slate-400 py-10 px-4 rounded-md'>
                <h1 className='text-4xl text-Accent bg-white rounded-md p-4 text-center font-bold mb-4'>
                    {/* {t("Admin Dashboard")} */} Hope Hub
                </h1>

                <ul className='menu  w-56 text-lg rounded-md space-y-5 outline-none'>
                    <li>
                        <a
                            className={`menu-dropdown-show ${
                                visibleSection === "dashboard" ? "active" : ""
                            }`}
                            onClick={() => handleSectionToggle("dashboard")}
                        >
                            {/* {t("General")} */} Dashboard
                        </a>
                    </li>
                    <li className=''>
                        <span
                            className={` flex justify-between${
                                visibleSection === "users" ? "active" : ""
                            }`}
                            onClick={() => toggleDropdown("users")}
                        >
                            {t("Users")}
                            {isUserDropdownOpen ? (
                                <FaChevronUp className='text-base' />
                            ) : (
                                <FaChevronDown className='text-base' />
                            )}
                        </span>

                        {isUserDropdownOpen && (
                            <ul>
                                <li>
                                    <a
                                        className={`menu-dropdown-show ${
                                            visibleSection === "patients"
                                                ? "active"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            handleSectionToggle("patients")
                                        }
                                    >
                                        {t("Patients")}
                                    </a>
                                </li>

                                <li>
                                    <a
                                        className={`${
                                            visibleSection === "therapists"
                                                ? "active"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            handleSectionToggle("therapists")
                                        }
                                    >
                                        {t("Therapists")}
                                    </a>
                                </li>

                                <li>
                                    <a
                                        className={`${
                                            visibleSection === "receivedEmails"
                                                ? "active"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            handleSectionToggle(
                                                "receivedEmails"
                                            )
                                        }
                                    >
                                        {t("Emails")}
                                    </a>
                                </li>
                            </ul>
                        )}
                    </li>
                    <li>
                        <span
                            className={`flex justify-between ${
                                visibleSection === "Jobs" ? "" : ""
                            }`}
                            onClick={() => toggleDropdown("Jobs")}
                        >
                            {t("Jobs")}
                            {isJobsDropdownOpen ? (
                                <FaChevronUp className='text-base' />
                            ) : (
                                <FaChevronDown className='text-base' />
                            )}
                        </span>
                        {isJobsDropdownOpen && (
                            <ul>
                                <li>
                                    <a
                                        className={` ${
                                            visibleSection === "Jobs"
                                                ? "active"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            handleSectionToggle("Jobs")
                                        }
                                    >
                                        {t("Jobs")}
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className={` ${
                                            visibleSection === "Edit Jobs"
                                                ? "active"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            handleSectionToggle("Edit Jobs")
                                        }
                                    >
                                        {t("Edit Jobs")}
                                    </a>
                                </li>
                            </ul>
                        )}
                    </li>
                    <li>
                        <span
                            className={`flex justify-between ${
                                visibleSection === "Blogs" ? "active" : ""
                            }`}
                            onClick={() => toggleDropdown("blogs")}
                        >
                            {t("Blogs")}
                            {isBlogsDropdownOpen ? (
                                <FaChevronUp className='text-base' />
                            ) : (
                                <FaChevronDown className='text-base' />
                            )}
                        </span>
                        {isBlogsDropdownOpen && (
                            <ul>
                                <li>
                                    <a
                                        className={` ${
                                            visibleSection === "Posts"
                                                ? "active"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            handleSectionToggle("Posts")
                                        }
                                    >
                                        {t("Posts")}
                                    </a>
                                </li>

                                <li>
                                    <a
                                        className={` ${
                                            visibleSection === "Blogs Edit"
                                                ? "active"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            handleSectionToggle("Blogs Edit")
                                        }
                                    >
                                        {t("Edit")}
                                    </a>
                                </li>
                            </ul>
                        )}
                    </li>
                </ul>
            </div>

            <div className='w-full'>
                <div className='flex items-center justify-end w-full gap-5 p-4 mb-5'>
                    <button
                        className='w-28 h-10 shadow-md rounded-md text-lg font-medium bg-white'
                        onClick={() => location.reload()}
                    >
                        Refresh
                    </button>
                    <Link
                        className='w-28 h-10 shadow-md rounded-md text-lg font-medium items-center justify-center bg-red-500 text-white text-center flex'
                        href='/'
                    >
                        Close{" "}
                    </Link>
                </div>
                <div
                    className={`w-11/12 mx-auto p-4 border rounded-md grid-cols-[3fr_2fr] gap-x-1 gap-y-7 bg-white mt-6 ${
                        visibleSection === "dashboard" ? "grid" : "hidden"
                    }`}
                >
                    <div className='w-full h-fit p-4 flex flex-row justify-between col-start-1 col-span-2 row-start-1'>
                        <Widget title='Therapists' value={therapistsCount} />
                        <Widget title='Patients' value={patientsCount} />
                        {/* <Widget title='Sunscription' value={emails} /> */}
                        <Widget title='Blogs' value={blogsCount} />
                        <Widget title='Subscription' value={newsletterCount} />
                    </div>
                    <Bar
                        data={datesBarData}
                        setSelectedDate={setSelectedDate}
                    />
                    <SingleDate data={datesAppointments[selectedDate]} />
                    <Pie data={contactTypes} />
                </div>
                <div className=' flex flex-wrap py-2 '>
                    {visibleSection === "Jobs" && (
                        <div>
                            {jobs.map((job) => (
                                <Jobs
                                    key={job.id}
                                    title={job.title}
                                    location={job.location}
                                    job={job}
                                    onEdit={handleEditJob}
                                    onDelete={handleDeleteJob}
                                />
                            ))}
                        </div>
                    )}

                    {visibleSection === "Edit Jobs" && (
                        <div>
                            <JobsEdit job={selectedJob} />
                        </div>
                    )}
                    {visibleSection === "therapists" && (
                        // Render Therapists component when 'therapists' link is clicked
                        <>
                            {therapists.map((member) => (
                                <Therapists
                                    key={member.uid}
                                    image={member.image}
                                    name={member.name}
                                    age={member.age}
                                    birthday={member.birthday}
                                    gender={member.gender}
                                    phoneNumber={member.phoneNumber}
                                    imgURL={member.photoURL}
                                    email={member.email}
                                    therapist={member}
                                    onDelete={() =>
                                        handleDeleteTherapist(member)
                                    }
                                />
                            ))}
                        </>
                    )}
                    {visibleSection === "patients" && (
                        // Render Patients component when 'patients' link is clicked
                        <>
                            {patients.map((member) => (
                                <Patients
                                    key={member.uid}
                                    image={member.image}
                                    name={member.name}
                                    age={member.age}
                                    birthday={member.birthday}
                                    gender={member.gender}
                                    phoneNumber={member.phoneNumber}
                                    imgURL={member.photoURL}
                                    email={member.email}
                                    patient={member}
                                    onDelete={() => handleDeletePatient(member)}
                                />
                            ))}
                        </>
                    )}
                    {visibleSection === "receivedEmails" && (
                        // Render ReceivedEmails section
                        <ReceivedEmails emails={receivedEmails} />
                    )}
                </div>
                <div className='py-4 pr-4 flex flex-col w-full'>
                    {" "}
                    {visibleSection === "Posts" && (
                        <div className='flex font-poppins text-NeutralBlack bg-slate-400 mx-4 py-4 px-2 space-x-2 rounded-md'>
                            {" "}
                            <h3 className=''>{t("All Blogs")}</h3>{" "}
                        </div>
                    )}
                    {visibleSection === "Posts" &&
                        blogs.map((blog) => (
                            <Blogs
                                key={blog.id}
                                blog={blog}
                                onEdit={handleEditBlog}
                                onDelete={handleDeleteBlog}
                            />
                        ))}
                    {visibleSection === "Blogs Edit" && (
                        <BlogsEdit blog={selectedBlog} />
                    )}
                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps({ locale, query }) {
    const specialToken = query.specialToken;

    // Check if there is a valid special token
    if (specialToken !== process.env.NEXT_PUBLIC_SPECIAL_TOKEN) {
        return { redirect: { destination: "/Auth", permanent: false } };
    }

    const jobSnapshot = await getDocs(collection(db, "jobs"));
    const AllJobs = [];
    jobSnapshot.forEach((doc) => {
        AllJobs.push({ id: doc.id, ...doc.data() });
    });

    const blogSnapshot = await getDocs(collection(db, "blogs"));
    const Allblogs = [];
    blogSnapshot.forEach((doc) => {
        Allblogs.push(doc.data());
    });

    const userSnapshot = await getDocs(collection(db, "users"));
    const users = [];
    const datesAppointments = {};
    userSnapshot.forEach((doc) => {
        users.push(doc.data());
        const rdv = doc.data().appointments || [];
        rdv.forEach((el) => {
            datesAppointments[el.date] === undefined
                ? (datesAppointments[el.date] = [
                      { name: doc.data().name || doc.id, time: el.time },
                  ])
                : datesAppointments[el.date].push({
                      name: doc.data().name || doc.id,
                      time: el.time,
                  });
        });
    });

    // Fetch emails from the "contact" collection
    const contactsSnapshot = await getDocs(collection(db, "contact"));
    const receivedEmails = contactsSnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
    }));

    // console.log("server user", datesAppointments);
    const dateSnapshot = await getDocs(collection(db, "dates"));
    const dates = {};
    dateSnapshot.forEach((doc) => {
        // dates.push(doc.data())
        dates[doc.id] = doc.data();
    });
    const newsletterSnapshot = await getDocs(collection(db, "newsletter"));
    const newsletter = [];
    newsletterSnapshot.forEach((doc) => {
        newsletter.push(doc.data());
    });
    const allDates = [];
    for (let date in dates) {
        allDates.push({
            date: date,
            count: dates[date].bookedHours.length,
        });
    }

    const contactSnapshot = await getDocs(collection(db, "contact"));
    const contacts = [];
    contactSnapshot.forEach((doc) => {
        // dates.push(doc.data())
        contacts.push(doc.data());
    });
    const contactTypes = contacts.reduce((acc, curr) => {
        const found = acc.find((item) => item.name === curr.ContactType);
        if (found) {
            found.value++;
        } else {
            acc.push({ name: curr.ContactType, value: 1 });
        }
        return acc;
    }, []);

    //   console.log('data contact types', contactTypes)
    const datesBarData = allDates.slice(-7);
    const blogsCount = Allblogs.length;
    const patientsCount = users.filter((user) => !user.isTherapist).length;
    const therapistsCount = users.filter((user) => user.isTherapist).length;
    const newsletterCount = Object.keys(newsletter[0]).length;
    const jobsCount = AllJobs.length;
    // console.log("counts server", newsletterCount);
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
            Allblogs,
            users,
            datesBarData,
            blogsCount,
            patientsCount,
            therapistsCount,
            newsletterCount,
            datesAppointments,
            receivedEmails,
            contactTypes,
            AllJobs,
            jobsCount,
        },
    };
}
