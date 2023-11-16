import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    query,
    where,
} from "firebase/firestore";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

import BlogsEdit from "@/components/AdminDashboard/BlogsEdit";
import Patients from "@/components/AdminDashboard/Patients";
import Therapists from "@/components/AdminDashboard/Therapists";

// import { Patient, Therapist } from "@/util/constants";
import { db } from "@/util/firebase";
import Blogs from "@/components/AdminDashboard/Blogs";

export default function AdminDashboard({ blogs: initialBlogs, users }) {
    console.log("users data", users);
    const { t } = useTranslation("common");
    const [visibleSection, setVisibleSection] = useState("therapists");
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [blogs, setBlogs] = useState(initialBlogs);
    const [patients, setPatients] = useState(
        users.filter((user) => !user.isTherapist)
    ); // Initialize state with initial patients
    const [therapists, setTherapists] = useState(
        users.filter((user) => user.isTherapist)
    );
    const [isBlogsDropdownOpen, setIsBlogsDropdownOpen] = useState(false); // Correct the variable name
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
        }
    };

    const handleEditBlog = (blog) => {
        // Set the selected blog in the state
        setSelectedBlog(blog);
        // Switch to the 'Blogs Edit' section
        setVisibleSection("Blogs Edit");
    };

    const handleDelete = async (blog) => {
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
            <div className=' font-poppins pb-64 text-NeutralBlack bg-slate-400 py-10 px-4 rounded-md'>
                <h1 className='text-4xl text-Accent bg-white rounded-md p-4 text-center font-bold mb-4'>
                    {/* {t("Admin Dashboard")} */} Hope Hub
                </h1>

                <ul className='menu  w-56 text-lg rounded-md space-y-5 outline-none'>
                    <li>
                        <a>{/* {t("General")} */} Dashboard</a>
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
                <div className='flex flex-wrap py-2 '>
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
                                    patient={member}
                                    onDelete={() => handleDeletePatient(member)}
                                />
                            ))}
                        </>
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
                                onDelete={handleDelete}
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

    const blogSnapshot = await getDocs(collection(db, "blogs"));
    const blogs = [];
    blogSnapshot.forEach((doc) => {
        blogs.push(doc.data());
    });

    const userSnapshot = await getDocs(collection(db, "users"));
    const users = [];
    userSnapshot.forEach((doc) => {
        users.push(doc.data());
    });

    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
            blogs,
            users,
        },
    };
}
