import type { ComponentProps } from 'react';
import type { DetailItem } from './bannerModel';
import PersonalDetails from './PersonalDetails';

const CONTACT_KEYS = new Set<DetailItem['key']>(['email', 'phone', 'linkedin', 'website']);

export const isContact = (item: DetailItem) => CONTACT_KEYS.has(item.key);

/** Contact channels (email, phone, LinkedIn, website) — only those the user chose to show. */
export default function SocialLinks(props: ComponentProps<typeof PersonalDetails>) {
  const items = props.items.filter(isContact);
  if (!items.length) return null;
  return <PersonalDetails {...props} items={items} />;
}
