import { fas, IconPack } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

import FreeIcon from './free-icon';

const gather = (category: string, iconPack: IconPack) => {
  const icons: FreeIcon[] = [];
  for (const key of Object.keys(iconPack)) {
    const icon = iconPack[key];
    icons.push(new FreeIcon(['font-awesome', category, icon.iconName], icon.icon[4] as string));
  }
  return icons;
};

export default [...gather('solid', fas), ...gather('regular', far), ...gather('brands', fab)];
