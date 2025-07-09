// app/privacy/page.tsx

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how we handle your data, protect your privacy, and what happens upon account deletion.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-neutral-900">
      <div className="container mx-auto max-w-4xl p-6">
        <div className="space-y-8 rounded-lg p-8 shadow-sm bg-neutral-800/50 dark:shadow-none sm:p-12">
          <div className="space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-500 dark:text-gray-400">
              <strong>Last Updated:</strong> July 8, 2025
            </p>
          </div>

          <div className="space-y-6 text-gray-600 dark:text-gray-300">
            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                Introduction
              </h2>
              <p>
                Welcome to our application. Your privacy is important to us.
                This Privacy Policy explains how we collect, use, and share your
                information when you use our service. By using our website, you
                agree to the collection and use of information in accordance
                with this policy.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                1. Information We Collect
              </h2>
              <p>
                When you sign up and authenticate using our third-party
                provider, <strong>Clerk</strong>, we require access to certain
                personal information to create and manage your account. The data
                we store in our database includes:
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-6">
                <li>
                  <strong>Display Name:</strong> Your publicly visible name on
                  our platform.
                </li>
                <li>
                  <strong>Username:</strong> Your unique identifier for your
                  profile.
                </li>
                <li>
                  <strong>Bio:</strong> The personal description you provide for
                  your profile.
                </li>
              </ul>
              <p className="mt-4">
                We rely on Clerk for the secure handling of your authentication
                credentials (like email or social logins), and we do not store
                your passwords.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                2. Publicly Shared Information
              </h2>
              <p>
                Our platform is designed to help you share content with others.
                Any content you voluntarily upload is considered public
                information and can be viewed by anyone. This includes:
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-6">
                <li>
                  <strong>Images and Albums:</strong> Any images or collections
                  of images you upload.
                </li>
                <li>
                  <strong>Names and Descriptions:</strong> The titles and
                  descriptions you assign to your images or albums.
                </li>
              </ul>
              <p className="mt-4">
                Please be mindful of the information you share, as we cannot
                control how others may use this publicly available data.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                3. How We Use Your Information
              </h2>
              <p>
                We use the information we collect for the following purposes:
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-6">
                <li>To provide and maintain our service.</li>
                <li>To manage your account and profile.</li>
                <li>
                  To display your user-generated content to the public as
                  intended by the service.
                </li>
                <li>To improve our website and user experience.</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                4. Your Rights and Data Management
              </h2>
              <p>
                You have the right to access, update, or delete the information
                we have on you. You can manage your display name, username, and
                bio directly from your account settings page.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                5. Account Deletion and Data Retention
              </h2>
              <p>
                We give you full control over your account. If you choose to
                delete your account from our authentication provider,{" "}
                <strong>Clerk</strong>, this action will trigger a complete
                removal of your data from our systems.
              </p>
              <p className="mt-4">
                Upon account deletion, we will permanently:
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-6">
                <li>
                  <strong>Delete your personal data</strong> (display name,
                  username, bio) from our application databases.
                </li>
                <li>
                  <strong>Delete all images and albums</strong> you have
                  uploaded from our storage provider, Amazon Web Services (AWS)
                  S3.
                </li>
              </ul>
              <p className="mt-4">
                This process is irreversible. Once your data is deleted, it
                cannot be recovered.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                6. Data Security
              </h2>
              <p>
                We are committed to protecting your data. We implement
                reasonable security measures to protect your personal
                information stored in our database. However, please remember
                that no method of transmission over the Internet or method of
                electronic storage is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                7. Changes to This Privacy Policy
              </h2>
              <p>
                We may update our Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page and updating the &ldquo;Last Updated&rdquo; date. You
                are advised to review this Privacy Policy periodically for any
                changes.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                8. Contact Us
              </h2>
              <p>
                If you have any questions about this Privacy Policy, please
                contact us at:
              </p>
              <p className="mt-4">
                <Link
                  href="mailto:arkalmady@gmail.com"
                  className="text-blue-600 underline hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500"
                >
                  arkalmady@gmail.com
                </Link>
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
