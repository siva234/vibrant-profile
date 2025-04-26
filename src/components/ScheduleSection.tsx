
import { InlineWidget } from "react-calendly";

const ScheduleSection = () => {
  return (
    <section id="schedule" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="section-heading">Schedule a Meeting</h2>
        <div className="mt-8">
          <div className="max-w-4xl mx-auto rounded-lg overflow-hidden shadow-lg bg-card">
            <InlineWidget
              url="https://calendly.com/siva-kolli1993"
              styles={{ height: '700px', width: '100%' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScheduleSection;
