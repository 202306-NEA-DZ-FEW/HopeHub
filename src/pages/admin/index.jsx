import { collection, getDocs } from "firebase/firestore";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

import BlogsEdit from "@/components/AdminDashboard/BlogsEdit";
import Patients from "@/components/AdminDashboard/Patients";
import Posts from "@/components/AdminDashboard/Posts";
import Therapists from "@/components/AdminDashboard/Therapists";
import Bar from "@/components/charts/Bar";
import SingleDate from "@/components/charts/singleDate";
import Widget from "@/components/charts/Widget";

// import { Patient, Therapist } from "@/util/constants";
import { db } from "@/util/firebase";

export default function AdminDashboard({
    blogs,
    users,
    datesBarData,
    blogsCount,
    patientsCount,
    therapistsCount,
    newsletterCount,
    datesAppointments,
}) {
    // console.log("users data", users);

    const { t } = useTranslation("common");
    const [visibleSection, setVisibleSection] = useState("therapists");
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const [isBlogsDropdownOpen, setIsBlogsDropdownOpen] = useState(false); // Correct the variable name
    const [selectedDate, setSelectedDate] = useState("");
    console.log("appointments", datesAppointments[selectedDate]);
    const handleSectionToggle = (section) => {
        setVisibleSection(section);
    };
    const Patient = users.filter((user) => !user.isTherapist);
    const Therapist = users.filter((user) => user.isTherapist);
    const toggleDropdown = (dropdown) => {
        if (dropdown === "users") {
            setIsUserDropdownOpen(!isUserDropdownOpen);
        } else if (dropdown === "blogs") {
            setIsBlogsDropdownOpen(!isBlogsDropdownOpen); // Correct the variable name
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
                <div
                    className={`w-11/12 mx-auto p-4 border rounded-md grid-cols-[3fr_2fr] gap-x-1 gap-y-7 bg-white mt-6 ${
                        visibleSection === "dashboard" ? "grid" : "hidden"
                    }`}
                >
                    <div className='w-full h-fit p-4 flex flex-row justify-between col-start-1 col-span-2 row-start-1'>
                        <Widget title='Therapists' value={therapistsCount} />
                        <Widget title='Patients' value={patientsCount} />
                        <Widget title='Blogs' value={blogsCount} />
                        <Widget title='Subscription' value={newsletterCount} />
                    </div>
                    <Bar
                        data={datesBarData}
                        setSelectedDate={setSelectedDate}
                    />
                    <SingleDate data={datesAppointments[selectedDate]} />
                </div>
                <div className='flex flex-wrap py-2 '>
                    {visibleSection === "therapists" && (
                        // Render Therapists component when 'therapists' link is clicked
                        <>
                            {Therapist.map((member) => (
                                <Therapists
                                    key={member.uid}
                                    image={member.image}
                                    name={member.name}
                                    age={member.age}
                                    birthday={member.birthday}
                                    gender={member.gender}
                                    phoneNumber={member.phoneNumber}
                                    imgURL={member.photoURL}
                                />
                            ))}
                        </>
                    )}
                    {visibleSection === "patients" && (
                        // Render Patients component when 'patients' link is clicked
                        <>
                            {Patient.map((member) => (
                                <Patients
                                    key={member.uid}
                                    image={member.image}
                                    name={member.name}
                                    age={member.age}
                                    birthday={member.birthday}
                                    gender={member.gender}
                                    phoneNumber={member.phoneNumber}
                                    imgURL={member.photoURL}
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
                            <Posts key={blog.id} name={blog.title} />
                        ))}
                    {visibleSection === "Blogs Edit" && <BlogsEdit />}
                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps({ locale, query }) {
    const specialToken = query.specialToken;
    // console.log("queryyyyyyyyyyyyyyy", query);
    // console.log("im token", specialToken);
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

    console.log("server user", datesAppointments);
    const dateSnapshot = await getDocs(collection(db, "dates"));
    const dates = {};
    dateSnapshot.forEach((doc) => {
        // dates.push(doc.data())
        dates[doc.id] = doc.data();
    });
    const newsletterSnapshot = await getDocs(collection(db, "dates"));
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
    const datesBarData = allDates.slice(-7);
    const blogsCount = blogs.length;
    const patientsCount = users.filter((user) => !user.isTherapist).length;
    const therapistsCount = users.filter((user) => user.isTherapist).length;
    const newsletterCount = newsletter.length;
    console.log("counts server", newsletterCount);
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
            blogs,
            users,
            datesBarData,
            blogsCount,
            patientsCount,
            therapistsCount,
            newsletterCount,
            datesAppointments,
        },
    };
}
