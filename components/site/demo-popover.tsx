import { routes } from '@/data/navigation';
import { dictionary as t } from '@/lib/dictionary';
import { DEMO_CONTACT_ID } from '@/components/ui/contact-action';
import { Icon } from '@/components/ui/icons';
import { PopoverLink } from './popover-link';

/** The preview notice every unconnected contact button opens (native popover: Escape and outside-click close it). */
export function DemoContactPopover() {
  return (
    <div id={DEMO_CONTACT_ID} popover="auto" className="demo-pop" role="dialog" aria-labelledby="demo-contact-title">
      <div className="flex items-start justify-between gap-4">
        <h2 id="demo-contact-title" className="text-h4">
          {t.demo.title}
        </h2>
        <button
          type="button"
          popoverTarget={DEMO_CONTACT_ID}
          popoverTargetAction="hide"
          className="-mr-2 -mt-2 grid size-11 shrink-0 cursor-pointer place-items-center rounded-full text-navy hover:bg-warm-grey"
          aria-label={t.demo.close}
        >
          <Icon name="close" />
        </button>
      </div>
      <p className="mt-3 text-small">{t.demo.body}</p>
      <PopoverLink closes={DEMO_CONTACT_ID} href={`${routes.bookATrip}#enquiry`} className="btn btn-secondary btn-sm mt-5">
        {t.demo.enquiry}
      </PopoverLink>
    </div>
  );
}
