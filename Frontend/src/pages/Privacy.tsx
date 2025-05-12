export default function Privacy() {
  return (
    <div className='container mx-auto px-4 py-24'>
      <div className='max-w-3xl mx-auto space-y-12'>
        <div className='text-center space-y-4'>
          <h1 className='text-4xl font-bold'>Privacy Policy</h1>
          <p className='text-lg text-muted-foreground'>
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className='prose prose-gray max-w-none'>
          <section className='space-y-4'>
            <h2 className='text-2xl font-semibold mt-14'>1. Introduction</h2>
            <p>
              At CoinLens, we take your privacy seriously. This Privacy Policy explains how we
              collect, use, disclose, and safeguard your information when you use our cryptocurrency
              tracking platform.
            </p>
          </section>

          <section className='space-y-4'>
            <h2 className='text-2xl font-semibold mt-14'>2. Information We Collect</h2>
            <p>We collect information that you provide directly to us, including:</p>
            <ul className='list-disc pl-6 space-y-2'>
              <li>Account information (email, password)</li>
              <li>Profile information (name, preferences)</li>
              <li>Portfolio data (cryptocurrency holdings)</li>
              <li>Usage data and preferences</li>
            </ul>
          </section>

          <section className='space-y-4'>
            <h2 className='text-2xl font-semibold mt-14'>3. How We Use Your Information</h2>
            <p>We use the collected information for various purposes:</p>
            <ul className='list-disc pl-6 space-y-2'>
              <li>To provide and maintain our service</li>
              <li>To notify you about changes to our service</li>
              <li>To provide customer support</li>
              <li>To gather analysis or valuable information</li>
              <li>To monitor the usage of our service</li>
              <li>To detect, prevent and address technical issues</li>
            </ul>
          </section>

          <section className='space-y-4'>
            <h2 className='text-2xl font-semibold mt-14'>4. Data Security</h2>
            <p>
              The security of your data is important to us. We implement appropriate technical and
              organizational measures to protect your personal information against unauthorized
              access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section className='space-y-4'>
            <h2 className='text-2xl font-semibold mt-14'>5. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className='list-disc pl-6 space-y-2'>
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
              <li>Request restriction of processing your data</li>
              <li>Request transfer of your data</li>
              <li>Withdraw consent</li>
            </ul>
          </section>

          <section className='space-y-4'>
            <h2 className='text-2xl font-semibold mt-14'>6. Cookies</h2>
            <p>
              We use cookies and similar tracking technologies to track activity on our service and
              hold certain information. You can instruct your browser to refuse all cookies or to
              indicate when a cookie is being sent.
            </p>
          </section>

          <section className='space-y-4'>
            <h2 className='text-2xl font-semibold mt-14'>7. Third-Party Services</h2>
            <p>
              We may employ third-party companies and individuals to facilitate our service, provide
              service on our behalf, perform service-related services, or assist us in analyzing how
              our service is used.
            </p>
          </section>

          <section className='space-y-4'>
            <h2 className='text-2xl font-semibold mt-14'>8. Changes to This Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes
              by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section className='space-y-4'>
            <h2 className='text-2xl font-semibold mt-14'>9. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at:</p>
            <p className='font-medium'>Email: contact@abolfazlchaman.com</p>
          </section>
        </div>
      </div>
    </div>
  );
}
