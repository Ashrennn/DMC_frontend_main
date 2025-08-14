import { Component, Input, OnDestroy, AfterViewInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router, NavigationEnd } from '@angular/router';
import { FooterContentService } from '../content/footer-content.service';
import { LanguageService } from '../../../../../../shared/services/language.service';
import { Subscription, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'dmc-mobile-footer',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="mobile-footer" [ngClass]="{
      'mobile-small': childData?.breakpoint === 'mobile-small',
      'mobile-large': childData?.breakpoint === 'mobile-large'
    }">
      <div class="footer-content">
        <!-- Top Container -->
        <div class="top-container">
          <!-- Company Logos -->
          <div class="logos-section">
            <img [src]="topContentData?.logos?.company?.src || '/images/footer/icons/dmc.png'"
                 [alt]="topContentData?.logos?.company?.alt || 'DMC Company Logo'"
                 class="company-logo">
            <img [src]="topContentData?.logos?.ssl?.src || '/images/footer/icons/ssl.png'"
                 [alt]="topContentData?.logos?.ssl?.alt || 'SSL Certificate'"
                 class="ssl-logo">
          </div>

          <!-- Location Section -->
          <div class="location-section">
            <div class="location-header">
              <mat-icon class="location-icon">location_on</mat-icon>
              <h3 class="location-title">{{locationData?.title}}</h3>
            </div>
            <div class="map-container">
              <div id="footer-leaflet-map" class="leaflet-map"></div>
            </div>
          </div>

          <!-- Quick Connect Section -->
          <div class="quick-connect-section">
            <!-- Stay Updated -->
            <div class="stay-updated">
              <h4 class="section-title">{{quickConnectData?.stayUpdated?.title}}</h4>
              <p class="section-description">{{quickConnectData?.stayUpdated?.description}}</p>
              <div class="email-subscription">
                <input type="email" 
                       [placeholder]="quickConnectData?.stayUpdated?.emailPlaceholder" 
                       class="email-input">
                <button class="subscribe-btn">{{quickConnectData?.stayUpdated?.subscribeButton}}</button>
              </div>
            </div>

            <!-- Follow Us -->
            <div class="follow-us">
              <h4 class="section-title">{{quickConnectData?.followUs?.title}}</h4>
              <div class="social-icons">
                <button *ngFor="let social of quickConnectData?.followUs?.socialLinks" 
                        class="social-icon" 
                        (click)="onSocialClick(social)"
                        [title]="social.label">
                  <mat-icon>{{social.icon}}</mat-icon>
                </button>
              </div>
            </div>

            <!-- Navigation Links -->
            <div class="navigation-links">
              <div class="nav-link" (click)="onNavLinkClick('sitemap')">
                <mat-icon class="link-icon">{{quickConnectData?.actionButtons?.[2]?.icon}}</mat-icon>
                <span class="link-text">{{quickConnectData?.actionButtons?.[2]?.label}}</span>
              </div>
              <div class="nav-link" (click)="onNavLinkClick('downloads')">
                <mat-icon class="link-icon">{{quickConnectData?.actionButtons?.[3]?.icon}}</mat-icon>
                <span class="link-text">{{quickConnectData?.actionButtons?.[3]?.label}}</span>
              </div>
            </div>


          </div>
        </div>
        <div class="bottom-container">
          <div class="company-info">
            <div class="company-name">{{companyInfo?.name}}<span class="registered">{{companyInfo?.registered}}</span></div>
            <div class="copyright">{{companyInfo?.copyright}}</div>
          </div>
          
          <div class="disclaimer">
            {{disclaimer}}
          </div>

          <div class="links-grid">
            <div class="link" *ngFor="let link of legalLinks" (click)="onLinkClick(link)">
              <span class="material-icons">{{link.icon}}</span>
              <span>{{link.label}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .mobile-footer {
      width: 100%;
      height: 100vh;
      font-family: 'Roboto', Arial, sans-serif;
      background: url('/images/footer/backgrounds/ft1.jpg') center/cover no-repeat;
      position: relative;
      padding-left: 0.5rem;
      padding-right: 0.5rem;
      display: flex;

      .footer-content {
        padding-top: 60px;
        width: 100%;
        height: calc(100vh);
        display: flex;
        flex-direction: column;

        .top-container {
          width: 100%;
          height: 62.5%;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px); /* Safari support */
          border-radius: 25px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
          position: relative;
          background: linear-gradient(
            135deg,
            rgba(215, 227, 255, 0.1) 0%,
            rgba(215, 227, 255, 0.2) 100%
          );
          margin-bottom: 0;
          padding: 1rem;
          display: -webkit-flex; /* Safari support */
          display: flex;
          -webkit-flex-direction: column; /* Safari support */
          flex-direction: column;
          gap: 0.75rem;
          overflow: hidden; /* Prevent content from leaving container */

                    /* Logos Section */
          .logos-section {
            display: -webkit-flex; /* Safari support */
            display: flex;
            -webkit-justify-content: center; /* Safari support */
            justify-content: center;
            -webkit-align-items: center; /* Safari support */
            align-items: center;
            gap: 0.5rem;
            margin-bottom: -0.5rem; /* No spacing */

                        .company-logo, .ssl-logo {
              height: 50px;
              max-width: 130px;
              flex: 1;
              object-fit: contain;
              border-radius: 8px;
              display: block;
            margin: 0 auto;
              overflow: visible;
            }

            .company-logo {
            }

            .ssl-logo {
            }
          }

          /* Location Section */
          .location-section {
            margin-bottom: 0.25rem; /* Reduced spacing */
            .location-header {
              display: -webkit-flex; /* Safari support */
              display: flex;
              -webkit-align-items: center; /* Safari support */
              align-items: center;
              gap: 0.5rem;
              margin-bottom: 0.5rem;

              .location-icon {
                color: var(--primary-color);
                font-size: 1.1rem;
              }

              .location-title {
                color: var(--primary-color);
                font-size: 0.8rem;
                font-weight: 600;
                margin: 0;
              }
            }

            .map-container {
              position: relative;
              height: 130px;
              border-radius: 12px;
              overflow: hidden;
              background: rgba(0, 27, 63, 0.3);
              border: 1px solid rgba(215, 227, 255, 0.2);

              .leaflet-map {
                width: 100%;
                height: 100%;
                border-radius: 12px;
                
                /* RTL support for Arabic */
                [dir="rtl"] & {
                  border-radius: 12px;
                }
              }

          /* Compact Leaflet popup */
          :global(.leaflet-popup.footer-map-popup) {
            margin: 0;
          }
          :global(.leaflet-popup.footer-map-popup .leaflet-popup-content-wrapper) {
            padding: 4px 6px;
            border-radius: 8px;
          }
          :global(.leaflet-popup.footer-map-popup .leaflet-popup-content) {
            margin: 4px 6px;
            font-size: 0.62rem;
            line-height: 1.25;
          }
          :global(.leaflet-popup.footer-map-popup .leaflet-popup-tip) {
            width: 8px;
            height: 8px;
          }

              .address-popup {
                position: absolute;
                top: 10px;
                left: 10px;
                background: rgba(0, 27, 63, 0.9);
                padding: 0.35rem 0.45rem;
                border-radius: 8px;
                border: 1px solid rgba(215, 227, 255, 0.3);
                max-width: calc(100% - 20px);

                .address-text {
                  color: rgba(215, 227, 255, 0.9);
                  font-size: 0.62rem;
                  line-height: 1.25;
                  white-space: pre-line;
                }
              }
              /* Correct positioning when RTL */
              .address-popup[dir='rtl'] {
                left: auto;
                right: 10px;
                text-align: right;
              }
            }
          }

          /* Quick Connect Section */
          .quick-connect-section {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;

            .section-title {
              color: var(--primary-color);
              font-size: 0.75rem;
              font-weight: 600;
              margin: 0 0 0.3rem 0;
              text-align: center;
            }

            .section-description {
              color: var(--primary-color);
              font-size: 0.65rem;
              margin: 0 0 0.5rem 0;
              line-height: 1.3;
              opacity: 0.8;
              text-align: center;
            }

            /* Stay Updated */
            .stay-updated {
              .email-subscription {
                display: flex;
                align-items: stretch;
                gap: 0;
                max-width: 300px;
                margin: 0 auto;

                .email-input {
                  flex: 1;
                  height: 100%;
                  padding: 0.4rem 0.8rem;
                  border: 1px solid var(--secondary-color);
                  border-radius: 50px 0 0 50px;
                  background: var(--secondary-color);
                  color: var(--primary-color);
                  font-size: 0.7rem;
                  text-align: center;
                  border-right: none;

                  &::placeholder {
                    color: var(--primary-color);
                    opacity: 0.7;
                    text-align: center;
                  }

                  &:focus {
                    outline: none;
                    border-color: var(--secondary-color);
                  }

                  /* RTL support for Arabic */
                  [dir="rtl"] & {
                    border-radius: 0 50px 50px 0;
                    border-left: none;
                    border-right: 1px solid var(--secondary-color);
                  }
                }

                .subscribe-btn {
                  padding: 0.4rem 0.9rem;
                  background: var(--primary-color);
                  color: var(--secondary-color);
                  border: 1px solid var(--primary-color);
                  border-radius: 0 50px 50px 0;
                  font-size: 0.7rem;
                  font-weight: 600;
                  cursor: pointer;
                  transition: all 0.3s ease;
                  border-left: none;
                  height: 100%;
                  width: 110px; /* fixed */
                  margin-left: 0; /* remove overlap */

                  &:hover {
                    background: var(--primary-color);
                    opacity: 0.9;
                    transform: translateY(-1px);
                  }

                  /* RTL support for Arabic */
                  [dir="rtl"] & {
                    border-radius: 50px 0 0 50px;
                    border-right: none;
                    border-left: 1px solid var(--primary-color);
                  }
                }
              }
            }

            /* Follow Us */
            .follow-us {
              .social-icons {
                display: flex;
                justify-content: center;
                gap: 0.5rem;
                flex-wrap: wrap;

                .social-icon {
                  width: 32px;
                  height: 32px;
                  border: 1px solid var(--primary-color);
                  border-radius: 50%;
                  background: var(--primary-color);
                  color: var(--secondary-color);
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  cursor: pointer;
                  transition: all 0.3s ease;

                  mat-icon {
                    font-size: 0.9rem;
                    width: 0.9rem;
                    height: 0.9rem;
                  }

                  &:hover {
                    background: var(--primary-color);
                    opacity: 0.8;
                    transform: translateY(-2px);
                  }
                }
              }
            }

            /* Navigation Links */
            .navigation-links {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 1rem;
              width: 100%;
              max-width: 400px;
              margin: 0 auto;

              .nav-link {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                gap: 0.2rem;
                cursor: pointer;
                transition: all 0.3s ease;
                padding: 0.5rem;
                border-radius: 20px;
                position: relative;
                
                &:hover {
                  background: rgba(255, 255, 255, 0.1);
                  transform: translateY(-2px);
                }
                
                .link-icon {
                  font-size: 0.9rem;
                  width: 0.9rem;
                  height: 0.9rem;
                  color: var(--primary-color);
                  flex-shrink: 0;
                  text-decoration: underline;
                  text-underline-offset: 2px;
                  text-decoration-thickness: 1px;
                }
                
                .link-text {
                  font-size: 0.55rem;
                  font-weight: 400;
                  color: var(--primary-color);
                  text-align: center;
                  text-decoration: underline;
                  text-underline-offset: 2px;
                  text-decoration-thickness: 1px;
                  letter-spacing: 0.2px;
                  white-space: nowrap;
                  margin-right: 0.3rem;
                }
                
                &::after {
                  content: '↗';
                  font-size: 0.5rem;
                  color: var(--primary-color);
                  opacity: 0.7;
                  font-weight: normal;
                  margin-left: 0.05rem;
                }
              }
            }
          }
        }

        .bottom-container {
          width: 90%;
          background: #001B3F;
          border-radius: 0 0 25px 25px;
          margin: 0 auto;
          position: relative;
          margin-top: 0;
          padding: 1.25rem 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .company-info {
            text-align: center;
            .company-name {
              font-size: 0.9rem;
              font-weight: 500;
              letter-spacing: 0.6px;
              color: rgba(215, 227, 255, 0.9);
              
              .registered {
                font-size: 0.45rem;
                vertical-align: super;
                margin-left: 1px;
              }
            }

            .copyright {
              font-size: 0.55rem;
              color: rgba(215, 227, 255, 0.75);
              margin-top: 0.2rem;
            }
          }

          .disclaimer {
            font-size: 0.5rem;
            line-height: 1.2;
            color: rgba(215, 227, 255, 0.65);
            text-align: center;
            padding: 0.5rem 0.35rem;
            height: 55%;
            min-height: 55%;
            max-height: 55%;
              display: -webkit-box;
              -webkit-line-clamp: 9;
              -webkit-box-orient: vertical;
              overflow: hidden;
            max-width: 95%;
            margin: 0 auto;
          }

          .links-grid {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 0.25rem;
            padding: 0 0.35rem;

            .link {
              text-align: center;
              padding: 0.25rem;
              color: rgba(215, 227, 255, 0.8);
              transition: color 0.2s;
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 0.25rem;

              .material-icons {
                font-size: 0.75rem;
                height: 0.75rem;
                width: 0.75rem;
                line-height: 0.75rem;
              }

              span:not(.material-icons) {
                font-size: 0.5rem;
              }

              &:hover {
                color: rgba(215, 227, 255, 1);
              }
            }
          }
        }
      }

      /* RTL/Arabic specific styles */
      &:dir(rtl) {
        .company-info .company-name {
          font-size: 1.1rem !important;
          font-weight: 600;
          letter-spacing: 0.3px;
        }

        .company-info .copyright {
          font-size: 0.7rem !important;
          margin-top: 0.3rem;
        }

        .disclaimer {
          font-size: 0.60rem !important;
          line-height: 1.4 !important;
          font-weight: 400;
          letter-spacing: 0.2px;
        }

        .links-grid .link {
          span:not(.material-icons) {
            font-size: 0.75rem !important;
            font-weight: 500;
          }
        }

        /* Fix email subscription pill ends and order in RTL */
        .quick-connect-section {
          .stay-updated {
            .email-subscription {
              /* Force single row, button left, input right */
              display: flex !important;
              flex-direction: row-reverse;
              align-items: stretch;
              gap: 0;
              .email-input {
                width: auto;
                min-width: 0; /* allow shrink */
                height: 100%;
                border-radius: 0 50px 50px 0; /* rounded on right, flat on left (middle) */
                border-right: 1px solid var(--secondary-color); /* outer edge */
                border-left: none; /* join to button */
                flex: 1 1 auto;
              }
              .subscribe-btn {
                width: 110px; /* fixed */
                height: 100%;
                border-radius: 50px 0 0 50px; /* rounded on left, flat on right (middle) */
                border-left: 1px solid var(--primary-color); /* outer edge */
                border-right: none; /* join to input */
                margin-right: 0; /* remove overlap */
                flex: 0 0 110px;
              }
            }
          }
        }

        &.mobile-large {
          .company-info .company-name {
            font-size: 1.3rem !important;
          }

          .company-info .copyright {
            font-size: 0.85rem !important;
          }

          .disclaimer {
            font-size: 0.60rem !important;
            line-height: 1.5 !important;
          }

          .links-grid .link span:not(.material-icons) {
            font-size: 0.9rem !important;
          }
        }
      }

      /* Mobile small styles */
      &.mobile-small {
        .bottom-container {
          height: 30%; /* Reduced from 35% */
          }
        }

    /* Mobile large styles */
      &.mobile-large {
        .footer-content {
          max-width: 500px;
          margin: 0 auto;
          padding-top: 80px; /* Increased from 60px to account for taller header */
        }

        .top-container {
          max-width: 480px;
          margin: 0 auto;
          margin-bottom: 1.5rem; /* Increased spacing between containers */

          .logos-section {
            gap: 1rem !important; /* Reduced gap between logos */

            .company-logo, .ssl-logo {
              height: 65px !important; /* Increased from 50px */
              max-width: 160px !important; /* Increased from 130px */
              flex: 0 0 auto !important; /* Override flex: 1 to allow size changes */
            }
          }
        }

        .bottom-container {
          height: 35%; /* Increased from 30% to reduce bottom space */
          max-width: 400px; /* Reduced from 450px */
          margin: 0 auto;

      .disclaimer {
            font-size: 0.7rem;
            line-height: 1.4;
        padding: 0.6rem 0.5rem;
      }

      .links-grid {
        gap: 0.35rem;
        padding: 0 0.5rem;

        .link {
          padding: 0.35rem;
          gap: 0.35rem;

          .material-icons {
                font-size: 0.95rem;
                height: 0.95rem;
                width: 0.95rem;
                line-height: 0.95rem;
          }

          span:not(.material-icons) {
                font-size: 0.7rem;
              }
          }
        }
      }
      }
    }
  `]
})
export class MobileFooterComponent implements OnDestroy, AfterViewInit {
  @Input() childData: any;

  currentLang: 'en' | 'ar' = 'en';
  companyInfo: any;
  disclaimer: string = '';
  legalLinks: any[] = [];
  
  // Top container data
  topRowData: any;
  topContentData: any;
  locationData: any;
  quickConnectData: any;
  
  private subscription: Subscription = new Subscription();
  // Leaflet refs
  private leafletLib: any | null = null;
  private leafletMap: any | null = null;
  private leafletMarker: any | null = null;

  constructor(
    private footerContentService: FooterContentService,
    private languageService: LanguageService,
    private zone: NgZone,
    private router: Router
  ) {
    // Subscribe to language changes
    this.subscription.add(
      this.languageService.currentLang$.subscribe(lang => {
        if (lang === 'en' || lang === 'ar') {
          this.currentLang = lang;
          this.loadContent();
        }
      })
    );

    // Subscribe to route changes to refresh map
    this.subscription.add(
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(() => {
        // Refresh map after route change with delay
        setTimeout(() => {
          if (this.leafletMap) {
            this.leafletMap.invalidateSize();
          }
        }, 300);
      })
    );

    // Handle window resize to refresh map
    this.subscription.add(
      new Observable<void>((observer: any) => {
        const resizeHandler = () => observer.next();
        window.addEventListener('resize', resizeHandler);
        return () => window.removeEventListener('resize', resizeHandler);
      }).subscribe(() => {
        // Debounce resize events
        setTimeout(() => {
          if (this.leafletMap) {
            this.leafletMap.invalidateSize();
          }
        }, 250);
      })
    );

    // Handle visibility changes (when tab becomes active)
    this.subscription.add(
      new Observable<void>((observer: any) => {
        const visibilityHandler = () => observer.next();
        document.addEventListener('visibilitychange', visibilityHandler);
        return () => document.removeEventListener('visibilitychange', visibilityHandler);
      }).subscribe(() => {
        this.handleVisibilityChange();
      })
    );
    
    // Initial load
    this.loadContent();
  }

  ngAfterViewInit(): void {
    // Add delay to ensure DOM and CSS are fully loaded
    setTimeout(() => {
      this.initializeMap();
    }, 150);
  }

  // Handle visibility changes (when tab becomes active again)
  private handleVisibilityChange(): void {
    if (this.leafletMap && !document.hidden) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        this.leafletMap.invalidateSize();
      }, 100);
    }
  }

  // Public method to force map refresh (can be called from parent if needed)
  public forceMapRefresh(): void {
    if (this.leafletMap) {
      this.leafletMap.invalidateSize();
    } else if (!this.leafletMap && this.locationData) {
      // If map doesn't exist, try to initialize it
      this.initializeMap();
    }
  }

  private initializeMap(retryCount: number = 0): void {
    // Maximum retry attempts
    const maxRetries = 3;
    
    this.zone.runOutsideAngular(() => {
      try {
        const mapContainer = document.getElementById('footer-leaflet-map');
        
        // Check if container exists and has proper dimensions
        if (!mapContainer) {
          console.warn('Map container not found, retrying...');
          if (retryCount < maxRetries) {
            setTimeout(() => this.initializeMap(retryCount + 1), 200);
          }
          return;
        }

        // Check if container has proper dimensions and is visible
        if (mapContainer.offsetHeight === 0 || mapContainer.offsetWidth === 0 || 
            mapContainer.style.display === 'none' || mapContainer.style.visibility === 'hidden') {
          console.warn('Map container has no dimensions or is hidden, retrying...');
          if (retryCount < maxRetries) {
            setTimeout(() => this.initializeMap(retryCount + 1), 200);
          }
          return;
        }

        // Check if container is in viewport
        const rect = mapContainer.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) {
          console.warn('Map container has no bounding rect dimensions, retrying...');
          if (retryCount < maxRetries) {
            setTimeout(() => this.initializeMap(retryCount + 1), 200);
          }
          return;
        }

        // Check if map is already initialized
        if ((mapContainer as any)._leaflet_id) {
          console.log('Map already initialized');
          return;
        }

        // Lazy-load Leaflet
        import('leaflet').then((L) => {
          this.leafletLib = L;
          
          // Ensure default marker icons load
          const iconBase = 'https://unpkg.com/leaflet@1.9.4/dist/images/';
          this.leafletLib.Icon.Default.mergeOptions({
            iconRetinaUrl: iconBase + 'marker-icon-2x.png',
            iconUrl: iconBase + 'marker-icon.png',
            shadowUrl: iconBase + 'marker-shadow.png'
          });

          const map = this.leafletLib.map('footer-leaflet-map', {
            zoomControl: false,
            attributionControl: false,
          }).setView([this.locationData?.coordinates?.lat ?? 25.471945, this.locationData?.coordinates?.lng ?? 55.491711], 12);

          // Use CartoDB tiles for English place names
          this.leafletLib.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            maxZoom: 19,
            attribution: '©OpenStreetMap, ©CartoDB'
          }).addTo(map);

          // Create custom SVG location pin marker
          const customIcon = this.leafletLib.divIcon({
            html: '<div style="width: 24px; height: 24px; background: #D7E3FF; border-radius: 50%; border: 2px solid #001B3F; box-shadow: 0 2px 4px rgba(0,0,0,0.2); display: flex; align-items: center; justify-content: center;"><svg style="width: 16px; height: 16px; fill: #001B3F;" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg></div>',
            className: 'custom-location-marker',
            iconSize: [24, 24],
            iconAnchor: [12, 12]
          });

          // Place marker with popup
          const lat = this.locationData?.coordinates?.lat ?? 25.471945;
          const lng = this.locationData?.coordinates?.lng ?? 55.491711;
          const marker = this.leafletLib.marker([lat, lng], { icon: customIcon }).addTo(map);
          const address = this.locationData?.address ?? '';
          if (address) {
            const dir = this.currentLang === 'ar' ? 'rtl' : 'ltr';
            const html = `<div dir="${dir}" style="text-align:${dir==='rtl' ? 'right' : 'left'}; font-size:0.56rem; line-height:1.2;">${address.replace(/\n/g, '<br/>')}</div>`;
            marker.bindPopup(html, { autoPan: true, maxWidth: 150, className: 'footer-map-popup' }).openPopup();
          }

          // Fix sizing after render with multiple attempts
          setTimeout(() => {
            map.invalidateSize();
            // Additional size validation with multiple retries
            let retryCount = 0;
            const validateSize = () => {
              if (map.getSize().x === 0 || map.getSize().y === 0) {
                retryCount++;
                if (retryCount < 5) {
                  setTimeout(() => {
                    map.invalidateSize();
                    validateSize();
                  }, 100);
                }
              }
            };
            validateSize();
          }, 50);

          // Save refs for later language updates
          this.leafletMap = map;
          this.leafletMarker = marker;
          
          console.log('Map initialized successfully');
        }).catch((error) => {
          console.error('Failed to load Leaflet:', error);
          if (retryCount < maxRetries) {
            setTimeout(() => this.initializeMap(retryCount + 1), 500);
          }
        });
      } catch (error) {
        console.error('Map initialization error:', error);
        if (retryCount < maxRetries) {
          setTimeout(() => this.initializeMap(retryCount + 1), 300);
        }
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private loadContent() {
    // Bottom container content
    this.companyInfo = this.footerContentService.getCompanyInfo(this.currentLang);
    this.disclaimer = this.footerContentService.getDisclaimer(this.currentLang);
    this.legalLinks = this.footerContentService.getLegalLinks(this.currentLang);
    
    // Top container content
    this.topRowData = this.footerContentService.getTopRowContent(this.currentLang);
    this.topContentData = this.footerContentService.getLogos(this.currentLang);
    this.locationData = this.footerContentService.getLocationData(this.currentLang);
    this.quickConnectData = this.footerContentService.getQuickConnectData(this.currentLang);
    
    // Debug logging
    console.log('Mobile Footer - quickConnectData:', this.quickConnectData);
    console.log('Mobile Footer - actionButtons:', this.quickConnectData?.actionButtons);
    
    // Refresh map content (marker + popup) when language changes
    this.refreshLeafletMap();
  }

  onLinkClick(link: any) {
    if (link.url) {
      window.open(link.url, '_blank');
    }
    if (link.action) {
      // Handle action
    }
  }



  onSocialClick(social: any) {
    if (social.url) {
      window.open(social.url, '_blank');
    }
  }

  onNavLinkClick(linkType: string) {
    switch (linkType) {
      case 'customer-login':
        // Handle customer login navigation
        console.log('Customer login clicked');
        break;
      case 'staff-login':
        // Handle staff login navigation
        console.log('Staff login clicked');
        break;
      case 'sitemap':
        // Handle sitemap navigation
        console.log('Sitemap clicked');
        break;
      case 'downloads':
        // Handle downloads navigation
        console.log('Downloads clicked');
        break;
    }
  }


  
  get currentYear(): number {
    return new Date().getFullYear();
  }

  private refreshLeafletMap(): void {
    this.zone.runOutsideAngular(() => {
      if (!this.leafletMap || !this.leafletLib) {
        return; // not initialized yet
      }
      const L = this.leafletLib;
      const lat = this.locationData?.coordinates?.lat ?? 25.471945;
      const lng = this.locationData?.coordinates?.lng ?? 55.491711;
      this.leafletMap.setView([lat, lng], 12, { animate: false });
      if (this.leafletMarker) {
        this.leafletMap.removeLayer(this.leafletMarker);
      }
      // Create custom SVG location pin marker for refresh
      const customIcon = L.divIcon({
        html: '<div style="width: 24px; height: 24px; background: #D7E3FF; border-radius: 50%; border: 2px solid #001B3F; box-shadow: 0 2px 4px rgba(0,0,0,0.2); display: flex; align-items: center; justify-content: center;"><svg style="width: 16px; height: 16px; fill: #001B3F;" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg></div>',
        className: 'custom-location-marker',
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });
      
      this.leafletMarker = L.marker([lat, lng], { icon: customIcon }).addTo(this.leafletMap);
      const addr = (this.locationData?.address ?? '').toString();
      if (addr) {
        const dir = this.currentLang === 'ar' ? 'rtl' : 'ltr';
        const html = `<div dir="${dir}" style="text-align:${dir==='rtl' ? 'right' : 'left'}; font-size:0.56rem; line-height:1.2;">${addr.replace(/\n/g, '<br/>')}</div>`;
        this.leafletMarker.bindPopup(html, { autoPan: true, maxWidth: 150, className: 'footer-map-popup' }).openPopup();
      }
      setTimeout(() => this.leafletMap && this.leafletMap.invalidateSize(), 0);
    });
  }
}