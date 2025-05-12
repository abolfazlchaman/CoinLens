export default function Disclaimer() {
  return (
    <div className='container mx-auto px-4 py-20'>
      <div className='max-w-3xl mx-auto space-y-12'>
        <div className='text-center space-y-4'>
          <h1 className='text-4xl font-bold'>Disclaimer</h1>
          <p className='text-lg text-muted-foreground'>
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className='prose prose-gray max-w-none'>
          <section className='space-y-4'>
            <h2 className='text-2xl font-semibold mt-14'>1. No Financial Advice</h2>
            <p>
              The information provided on CoinLens is for general informational purposes only and
              should not be considered as financial advice. We are not financial advisors, and the
              content on our platform should not be used as a substitute for professional financial
              advice.
            </p>
          </section>

          <section className='space-y-4'>
            <h2 className='text-2xl font-semibold mt-14'>2. Market Data Accuracy</h2>
            <p>
              While we strive to provide accurate and up-to-date information, we cannot guarantee
              the accuracy, completeness, or reliability of any market data, prices, or other
              information displayed on our platform. Cryptocurrency markets are highly volatile and
              can change rapidly.
            </p>
          </section>

          <section className='space-y-4'>
            <h2 className='text-2xl font-semibold mt-14'>3. Investment Risks</h2>
            <p>
              Cryptocurrency investments involve significant risks. You should carefully consider
              whether trading or holding cryptocurrencies is suitable for you in light of your
              financial condition, investment objectives, and risk tolerance. Past performance is
              not indicative of future results.
            </p>
          </section>

          <section className='space-y-4'>
            <h2 className='text-2xl font-semibold mt-14'>4. Third-Party Content</h2>
            <p>
              Our platform may include content from third-party sources. We do not endorse or verify
              the accuracy of such content. Any reliance on third-party information is at your own
              risk.
            </p>
          </section>

          <section className='space-y-4'>
            <h2 className='text-2xl font-semibold mt-14'>5. Technical Issues</h2>
            <p>
              We do not guarantee that our platform will be available at all times or that it will
              be free from errors, viruses, or other harmful components. We are not responsible for
              any losses or damages that may result from technical issues or service interruptions.
            </p>
          </section>

          <section className='space-y-4'>
            <h2 className='text-2xl font-semibold mt-14'>6. User Responsibility</h2>
            <p>
              Users are responsible for their own investment decisions and should conduct their own
              research before making any financial decisions. You should never invest more than you
              can afford to lose.
            </p>
          </section>

          <section className='space-y-4'>
            <h2 className='text-2xl font-semibold mt-14'>7. Regulatory Compliance</h2>
            <p>
              Cryptocurrency regulations vary by jurisdiction. Users are responsible for ensuring
              compliance with applicable laws and regulations in their respective jurisdictions.
            </p>
          </section>

          <section className='space-y-4'>
            <h2 className='text-2xl font-semibold mt-14'>8. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, CoinLens and its operators shall not be liable
              for any direct, indirect, incidental, special, consequential, or punitive damages
              resulting from your use of or inability to use our platform.
            </p>
          </section>

          <section className='space-y-4'>
            <h2 className='text-2xl font-semibold mt-14'>9. Changes to Disclaimer</h2>
            <p>
              We reserve the right to modify this disclaimer at any time. Changes will be effective
              immediately upon posting to the website. Your continued use of our platform
              constitutes acceptance of any changes.
            </p>
          </section>

          <section className='space-y-4'>
            <h2 className='text-2xl font-semibold mt-14'>10. Contact Information</h2>
            <p>If you have any questions about this disclaimer, please contact us at:</p>
            <p className='font-medium'>Email: contact@abolfazlchaman.com</p>
          </section>
        </div>
      </div>
    </div>
  );
}
