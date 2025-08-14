import { Injectable } from '@angular/core';
import { DropdownContent } from './dropdown-content.types';

@Injectable({
  providedIn: 'root'
})
export class DropdownContentService {
  private dropdownContents: { [key: string]: DropdownContent } = {
    'menu1': {
      id: 'menu1',
      title: {
        en: 'Information Center',
        ar: 'مركز المعلومات'
      },
      items: [
        {
          id: 'registration',
          icon: 'how_to_reg',
          label: {
            en: 'Registration',
            ar: 'التسجيل'
          }
        },
        {
          id: 'downloads',
          icon: 'download',
          label: {
            en: 'Downloads',
            ar: 'التحميلات'
          }
        },
        {
          id: 'verification',
          icon: 'verified_user',
          label: {
            en: 'Verification',
            ar: 'التحقق'
          }
        },
        {
          id: 'tech_infrastructure',
          icon: 'dns',
          label: {
            en: 'Tech Infrastructure',
            ar: 'البنية التحتية التقنية'
          }
        },
        {
          id: 'contact',
          icon: 'contact_support',
          label: {
            en: 'Contact Us',
            ar: 'اتصل بنا'
          }
        }
      ]
    },
    'menu2': {
      id: 'menu2',
      title: {
        en: 'Global Locations',
        ar: 'المواقع العالمية'
      },
      items: [
        {
          id: 'usa',
          icon: 'location_on',
          label: {
            en: 'United States of America',
            ar: 'الولايات المتحدة الأمريكية'
          }
        },
        {
          id: 'ghana',
          icon: 'location_on',
          label: {
            en: 'Ghana',
            ar: 'غانا'
          }
        },
        {
          id: 'uae',
          icon: 'location_on',
          label: {
            en: 'United Arab Emirates',
            ar: 'الإمارات العربية المتحدة'
          }
        },
        {
          id: 'india',
          icon: 'location_on',
          label: {
            en: 'India',
            ar: 'الهند'
          }
        },
        {
          id: 'hongkong',
          icon: 'location_on',
          label: {
            en: 'Hong Kong',
            ar: 'هونج كونج'
          }
        }
      ]
    },
    'menu3': {
      id: 'menu3',
      title: {
        en: 'News and Media',
        ar: 'الأخبار والإعلام'
      },
      items: [
        {
          id: 'career',
          icon: 'work',
          label: {
            en: 'Career',
            ar: 'الوظائف'
          }
        },
        {
          id: 'group_info',
          icon: 'info',
          label: {
            en: 'Group Information',
            ar: 'معلومات المجموعة'
          }
        },
        {
          id: 'newsletter',
          icon: 'newspaper',
          label: {
            en: 'News Letter',
            ar: 'النشرة الإخبارية'
          }
        },
        {
          id: 'video_gallery',
          icon: 'video_library',
          label: {
            en: 'Video Gallery',
            ar: 'معرض الفيديو'
          }
        },
        {
          id: 'dmc_updates',
          icon: 'update',
          label: {
            en: 'DMC-Updates',
            ar: 'تحديثات DMC'
          }
        },
        {
          id: 'follow_us',
          icon: 'share',
          label: {
            en: 'Follow Us',
            ar: 'تابعنا'
          }
        }
      ]
    }
  };

  getDropdownContent(id: string): DropdownContent | undefined {
    return this.dropdownContents[id];
  }

  getAllDropdowns(): DropdownContent[] {
    return Object.values(this.dropdownContents);
  }
}
