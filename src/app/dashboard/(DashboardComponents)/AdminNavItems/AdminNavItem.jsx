"use client"; // Required for Next.js 13+ with App Router

import "./active.css";
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import { usePathname } from "next/navigation"; // To handle active links

const AdminNavItem = () => {
  const pathname = usePathname(); // Get the current route

  const [openSections, setOpenSections] = useState({
    courseEntry: false,
    batchInfo: false,
    admission: false,
    fee: false,
    attendance: false,
    sendSms: false,
    instructor: false,
    generalAccount: false,
    others: false,
    frontend: false,
    notice: false,
    gallery : false
  });

  const toggleSection = (section) => {
    setOpenSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  // Helper function to determine if a link is active
  const isActiveLink = (href) => pathname === href;

  return (
    <>
      <div className="sidebar dashboard-menu lg:text-base w-full">
        {/* Batch Info Section */}
        <button
          className="main-button hover:text-blue-700 flex justify-between items-center text-[18px] rounded-none font-medium py-4 px-7"
          onClick={() => toggleSection("batchInfo")}
        >
          Batch Info
          <IoIosArrowForward
            className={`arrow ${openSections.batchInfo ? "open" : "ml-5"}`}
          />
        </button>
        <div
          className={`sub-routes ${
            openSections.batchInfo ? "open ml-5" : "ml-5"
          }`}
        >
          <Link
            href="/dashboard/admin/batch-entry"
            className={`hover:bg-[#F0FBFF] main-button hover:text-blue-700 flex justify-between items-center text-[18px] rounded-none py-4 px-7 ${
              isActiveLink("/dashboard/admin/batch-entry") ? "active" : ""
            }`}
          >
            Batch Entry
          </Link>
          <Link
            href="/dashboard/admin/list-of-class"
            className={`hover:bg-[#F0FBFF] main-button hover:text-blue-700 flex justify-between items-center text-[18px] rounded-none py-4 px-7 ${
              isActiveLink("/dashboard/admin/list-of-class") ? "active" : ""
            }`}
          >
            List of Class
          </Link>
          <Link
            href="/dashboard/admin/list-of-batch"
            className={`hover:bg-[#F0FBFF] main-button hover:text-blue-700 flex justify-between items-center text-[18px] rounded-none py-4 px-7 ${
              isActiveLink("/dashboard/admin/list-of-batch") ? "active" : ""
            }`}
          >
            List of Batch
          </Link>
        </div>

        {/* Admission Section */}
        <button
          className="main-button hover:text-blue-700 flex justify-between items-center text-[18px] rounded-none font-medium py-4 px-7"
          onClick={() => toggleSection("admission")}
        >
          Admission
          <IoIosArrowForward
            className={`arrow ${openSections.admission ? "open" : "ml-5"}`}
          />
        </button>
        <div
          className={`sub-routes ${
            openSections.admission ? "open ml-5" : "ml-5"
          }`}
        >
          <Link
            href="/dashboard/admin/admission-entry"
            className={`hover:bg-[#F0FBFF] main-button hover:text-blue-700 flex justify-between items-center text-[18px] rounded-none py-4 px-7 ${
              isActiveLink("/dashboard/admission") ? "active" : ""
            }`}
          >
            Admission
          </Link>
          <Link
            href="/dashboard/admin/pending-admission-list"
            className={`hover:bg-[#F0FBFF] main-button hover:text-blue-700 flex justify-between items-center text-[18px] rounded-none py-4 px-7 ${
              isActiveLink("/dashboard/admission") ? "active" : ""
            }`}
          >
           Pending  Admission
          </Link>
          <Link
            href="/dashboard/admin/current-student"
            className={`hover:bg-[#F0FBFF] main-button hover:text-blue-700 flex justify-between items-center text-[18px] rounded-none py-4 px-7 ${
              isActiveLink("/dashboard/current-student") ? "active" : ""
            }`}
          >
            Current Student
          </Link>
          <Link
            href="/dashboard/admin/print-current-student"
            className={`hover:bg-[#F0FBFF] main-button hover:text-blue-700 flex justify-between items-center text-[18px] rounded-none py-4 px-7 ${
              isActiveLink("/dashboard/print-student") ? "active" : ""
            }`}
          >
            Print Student
          </Link>
        </div>

        {/* Fee Receive Section */}
        <button
          className="main-button hover:text-blue-700 flex justify-between items-center text-[18px] rounded-none font-medium py-4 px-7"
          onClick={() => toggleSection("fee")}
        >
          Fee Receive
          <IoIosArrowForward
            className={`arrow ${openSections.fee ? "open" : "ml-5"}`}
          />
        </button>
        <div
          className={`sub-routes ${openSections.fee ? "open ml-5" : "ml-5"}`}
        >
          <Link
            href="/dashboard/admin/fees-entry"
            className={`hover:bg-[#F0FBFF] main-button hover:text-blue-700 flex justify-between items-center text-[18px] rounded-none py-4 px-7 ${
              isActiveLink("/dashboard/fees-entry") ? "active" : ""
            }`}
          >
            Fees Receive
          </Link>
          <Link
            href="/dashboard/admin/fees-receive-list"
            className={`hover:bg-[#F0FBFF] main-button hover:text-blue-700 flex justify-between items-center text-[18px] rounded-none py-4 px-7 ${
              isActiveLink("/dashboard/fees-list") ? "active" : ""
            }`}
          >
            Fees List
          </Link>
        </div>

       

        {/* SMS Section */}
        <button
          className="main-button hover:text-blue-700 flex justify-between items-center text-[18px] rounded-none font-medium py-4 px-7"
          onClick={() => toggleSection("sendSms")}
        >
          SMS
          <IoIosArrowForward
            className={`arrow ${openSections.sendSms ? "open" : "ml-5"}`}
          />
        </button>
        <div
          className={`sub-routes ${openSections.sendSms ? "open ml-5" : "ml-5"}`}
        >
          <Link
            href="/dashboard/admin/sms-history"
            className={`hover:bg-[#F0FBFF] main-button hover:text-blue-700 flex justify-between items-center text-[18px] rounded-none py-4 px-7 ${
              isActiveLink("/dashboard/sms-history") ? "active" : ""
            }`}
          >
            SMS History
          </Link>
          <Link
            href="/dashboard/admin/bulk-sms"
            className={`hover:bg-[#F0FBFF] main-button hover:text-blue-700 flex justify-between items-center text-[18px] rounded-none py-4 px-7 ${
              isActiveLink("/dashboard/bulk-sms") ? "active" : ""
            }`}
          >
            Bulk SMS
          </Link>
          <Link
            href="/dashboard/admin/dues-alert"
            className={`hover:bg-[#F0FBFF] main-button hover:text-blue-700 flex justify-between items-center text-[18px] rounded-none py-4 px-7 ${
              isActiveLink("/dashboard/dues-alert") ? "active" : ""
            }`}
          >
            Dues Alert
          </Link>
        </div>

        {/* Notices Section */}
        <button
          className="main-button hover:text-blue-700 flex justify-between items-center text-[18px] rounded-none font-medium py-4 px-7"
          onClick={() => toggleSection("notice")}
        >
          Notices
          <IoIosArrowForward
            className={`arrow ${openSections.notice ? "open" : "ml-5"}`}
          />
        </button>
        <div
          className={`sub-routes ${openSections.notice ? "open ml-5" : "ml-5"}`}
        >
          <Link
            href="/dashboard/admin/notice-entry"
            className={`hover:bg-[#F0FBFF] main-button hover:text-blue-700 flex justify-between items-center text-[18px] rounded-none py-4 px-7 ${
              isActiveLink("/dashboard/admin/notice-entry") ? "active" : ""
            }`}
          >
            Notice Entry
          </Link>
          <Link
            href="/dashboard/admin/list-of-notice"
            className={`hover:bg-[#F0FBFF] main-button hover:text-blue-700 flex justify-between items-center text-[18px] rounded-none py-4 px-7 ${
              isActiveLink("/dashboard/admin/list-of-notice") ? "active" : ""
            }`}
          >
            Notices List
          </Link>
        </div>
 {/* Student Attendance Section */}
        <button
          className="main-button hover:text-blue-700 flex justify-between items-center text-[18px] rounded-none font-medium py-4 px-7"
          onClick={() => toggleSection("gallery")}
        >
         Gallery
          <IoIosArrowForward
            className={`arrow ${openSections.gallery ? "open" : "ml-5"}`}
          />
        </button>
        <div
          className={`sub-routes ${
            openSections.gallery ? "open ml-5" : "ml-5"
          }`}
        >
          <Link
            href="/dashboard/admin/gallery-entry"
            className={`hover:bg-[#F0FBFF] main-button hover:text-blue-700 flex justify-between items-center text-[18px] rounded-none py-4 px-7 ${
              isActiveLink("/dashboard/attendance-record") ? "active" : ""
            }`}
          >
            Gallery Entry
          </Link>
          <Link
            href="/dashboard/admin/list-of-gallery"
            className={`hover:bg-[#F0FBFF] main-button hover:text-blue-700 flex justify-between items-center text-[18px] rounded-none py-4 px-7 ${
              isActiveLink("/dashboard/attendance-record") ? "active" : ""
            }`}
          >
           List Of Gallery 
          </Link>
        </div>
        {/* Other Links Section */}
        <div
          className={`sub-routes ${openSections.others ? "open ml-5" : "ml-5"}`}
        >
          <Link
            href="/dashboard/admin/all-users"
            className={`hover:bg-[#F0FBFF] main-button hover:text-blue-700 flex justify-between items-center text-[18px] rounded-none py-4 px-7 ${
              isActiveLink("/dashboard/admin/all-users") ? "active" : ""
            }`}
          >
            All Users
          </Link>
          <Link
            href="/dashboard/teacher/student-send-notice"
            className={`hover:bg-[#F0FBFF] main-button hover:text-blue-700 flex justify-between items-center text-[18px] rounded-none py-4 px-7 ${
              isActiveLink("/dashboard/teacher/student-send-notice") ? "active" : ""
            }`}
          >
            Send Notices
          </Link>
          <Link
            href="/dashboard/successful-student"
            className={`hover:bg-[#F0FBFF] main-button hover:text-blue-700 flex justify-between items-center text-[18px] rounded-none py-4 px-7 ${
              isActiveLink("/dashboard/successful-student") ? "active" : ""
            }`}
          >
            Successful Student
          </Link>
          <Link
            href="/dashboard/registrations"
            className={`hover:bg-[#F0FBFF] main-button hover:text-blue-700 flex justify-between items-center text-[18px] rounded-none py-4 px-7 ${
              isActiveLink("/dashboard/registrations") ? "active" : ""
            }`}
          >
            Registrations
          </Link>
          <Link
            href="/dashboard/emergency-message"
            className={`hover:bg-[#F0FBFF] main-button hover:text-blue-700 flex justify-between items-center text-[18px] rounded-none py-4 px-7 ${
              isActiveLink("/dashboard/emergency-message") ? "active" : ""
            }`}
          >
            Emergency Message
          </Link>
          <Link
            href="/dashboard/contact-page"
            className={`hover:bg-[#F0FBFF] main-button hover:text-blue-700 flex justify-between items-center text-[18px] rounded-none py-4 px-7 ${
              isActiveLink("/dashboard/contact-page") ? "active" : ""
            }`}
          >
            Contact Page
          </Link>
          <Link
            href="/dashboard/report"
            className={`hover:bg-[#F0FBFF] main-button hover:text-blue-700 flex justify-between items-center text-[18px] rounded-none py-4 px-7 ${
              isActiveLink("/dashboard/report") ? "active" : ""
            }`}
          >
            Reports
          </Link>
          <Link
            href="/dashboard/settings"
            className={`hover:bg-[#F0FBFF] main-button hover:text-blue-700 flex justify-between items-center text-[18px] rounded-none py-4 px-7 ${
              isActiveLink("/dashboard/settings") ? "active" : ""
            }`}
          >
            Settings
          </Link>
        </div>
      </div>
    </>
  );
};

export default AdminNavItem;