export default function Terms() {
  return (
    <div className='container mx-auto px-4 py-24'>
      <div className='max-w-3xl mx-auto space-y-12'>
        <div className='text-center space-y-4'>
          <h1 className='text-4xl font-bold'>Terms of Service</h1>
          <p className='text-lg text-muted-foreground'>
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className='prose prose-gray max-w-none'>
          <section className='space-y-8'>
            <h2 className='text-2xl font-semibold mt-14'>1. Agreement to Terms</h2>
            <p>
              By accessing and using CoinLens, you agree to be bound by these Terms of Service and
              all applicable laws and regulations. If you do not agree with any of these terms, you
              are prohibited from using or accessing this site.
            </p>
          </section>

          <section className='space-y-8'>
            <h2 className='text-2xl font-semibold mt-14'>2. Use License</h2>
            <p>
              Permission is granted to temporarily access the materials (information or software) on
              CoinLens's website for personal, non-commercial transitory viewing only. This is the
              grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className='list-disc pl-6 space-y-2'>
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose</li>
              <li>Attempt to decompile or reverse engineer any software contained on CoinLens</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>
                Transfer the materials to another person or "mirror" the materials on any other
                server
              </li>
            </ul>
          </section>

          <section className='space-y-8'>
            <h2 className='text-2xl font-semibold mt-14'>3. Disclaimer</h2>
            <p>
              The materials on CoinLens's website are provided on an 'as is' basis. CoinLens makes
              no warranties, expressed or implied, and hereby disclaims and negates all other
              warranties including, without limitation, implied warranties or conditions of
              merchantability, fitness for a particular purpose, or non-infringement of intellectual
              property or other violation of rights.
            </p>
          </section>

          <section className='space-y-8'>
            <h2 className='text-2xl font-semibold mt-14'>4. Limitations</h2>
            <p>
              In no event shall CoinLens or its suppliers be liable for any damages (including,
              without limitation, damages for loss of data or profit, or due to business
              interruption) arising out of the use or inability to use the materials on CoinLens's
              website.
            </p>
          </section>

          <section className='space-y-8'>
            <h2 className='text-2xl font-semibold mt-14'>5. Accuracy of Materials</h2>
            <p>
              The materials appearing on CoinLens's website could include technical, typographical,
              or photographic errors. CoinLens does not warrant that any of the materials on its
              website are accurate, complete, or current. CoinLens may make changes to the materials
              contained on its website at any time without notice.
            </p>
          </section>

          <section className='space-y-8'>
            <h2 className='text-2xl font-semibold mt-14'>6. Links</h2>
            <p>
              CoinLens has not reviewed all of the sites linked to its website and is not
              responsible for the contents of any such linked site. The inclusion of any link does
              not imply endorsement by CoinLens of the site. Use of any such linked website is at
              the user's own risk.
            </p>
          </section>

          <section className='space-y-8'>
            <h2 className='text-2xl font-semibold mt-14'>7. Modifications</h2>
            <p>
              CoinLens may revise these terms of service for its website at any time without notice.
              By using this website you are agreeing to be bound by the then current version of
              these terms of service.
            </p>
          </section>

          <section className='space-y-8'>
            <h2 className='text-2xl font-semibold mt-14'>8. Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws
              and you irrevocably submit to the exclusive jurisdiction of the courts in that
              location.
            </p>
          </section>

          <section className='space-y-8'>
            <h2 className='text-2xl font-semibold mt-14'>9. Contact Information</h2>
            <p>If you have any questions about these Terms of Service, please contact us at:</p>
            <p className='font-medium'>Email: contact@abolfazlchaman.com</p>
          </section>
        </div>
      </div>
    </div>
  );
}
