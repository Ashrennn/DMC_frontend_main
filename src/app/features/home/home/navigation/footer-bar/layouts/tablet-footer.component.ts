import { Component, Input, OnDestroy, AfterViewInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router, NavigationEnd } from '@angular/router';
import { FooterContentService } from '../content/footer-content.service';
import { LanguageService } from '../../../../../../shared/services/language.service';
import { Subscription, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'dmc-tablet-footer',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="tablet-footer" [ngClass]="{
      'tablet-small': childData?.breakpoint === 'tablet-small',
      'tablet-large': childData?.breakpoint === 'tablet-large'
    }">
      <div class="footer-content">
        <div class="top-container">
          <!-- New Top Row Above Columns -->
          <div class="top-row">
            <div class="top-row-content">
              <h2 class="top-row-title">{{topRowData?.title}}</h2>
              <p class="top-row-description">{{topRowData?.description}}</p>
            </div>
          </div>
          
          <!-- New Middle Row with Three Equal Columns -->
          <div class="middle-row">
            <div class="middle-column" [ngClass]="{'rtl-padding': currentLang === 'ar'}">
              <!-- Company Logo and SSL Logo -->
              <img [src]="topContentData?.logos?.company?.src || '/images/footer/icons/dmc.png'"
                   [alt]="topContentData?.logos?.company?.alt?.[currentLang] || 'DMC Company Logo'"
                   class="company-logo">
              <img [src]="topContentData?.logos?.ssl?.src || '/images/footer/icons/ssl.png'"
                   [alt]="topContentData?.logos?.ssl?.alt?.[currentLang] || 'SSL Certificate'"
                   class="ssl-logo">
            </div>
            <div class="middle-column">
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
            </div>
            <div class="middle-column">
              <!-- Map Location -->
              <div class="map-container">
                <div class="location-header">
                  <mat-icon class="location-icon">location_on</mat-icon>
                  <h3 class="location-title">{{locationData?.title}}</h3>
                </div>
                <div id="tablet-footer-leaflet-map" class="leaflet-map" [ngClass]="{'rtl-mode': currentLang === 'ar'}"></div>
              </div>
            </div>
          </div>
          

          

          

          
          <!-- New Full-Width Row Below Columns -->
          <div class="full-width-row">
            <div class="row-content">
              <div class="navigation-links">
                <div class="nav-link" (click)="onNavLinkClick('customer-login')">
                  <mat-icon class="link-icon">{{quickConnectData?.actionButtons?.[0]?.icon}}</mat-icon>
                  <span class="link-text">{{quickConnectData?.actionButtons?.[0]?.label}}</span>
                </div>
                <div class="nav-link" (click)="onNavLinkClick('staff-login')">
                  <mat-icon class="link-icon">{{quickConnectData?.actionButtons?.[1]?.icon}}</mat-icon>
                  <span class="link-text">{{quickConnectData?.actionButtons?.[1]?.label}}</span>
                </div>
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
            <!-- Legal Pair -->
            <div class="link-pair">
              <div class="pair-heading">{{sectionTitles?.legal || 'Legal'}}</div>
              <div class="pair-divider"></div>
                             <div class="pair-links">
                 <div class="link" (click)="onLinkClick(legalLinks[0])">
                   <span class="material-icons">{{legalLinks[0]?.icon || 'privacy_tip'}}</span>
                   <span>{{legalLinks[0]?.label || 'Privacy'}}</span>
                 </div>
                 <div class="vertical-divider"></div>
                 <div class="link" (click)="onLinkClick(legalLinks[1])">
                   <span class="material-icons">{{legalLinks[1]?.icon || 'description'}}</span>
                   <span>{{legalLinks[1]?.label || 'Terms'}}</span>
                 </div>
               </div>
            </div>

            <!-- Security Pair -->
            <div class="link-pair">
              <div class="pair-heading">{{sectionTitles?.security || 'Security'}}</div>
              <div class="pair-divider"></div>
                             <div class="pair-links">
                 <div class="link" (click)="onLinkClick(legalLinks[2])">
                   <span class="material-icons">{{legalLinks[2]?.icon || 'shield'}}</span>
                   <span>{{legalLinks[2]?.label || 'Security'}}</span>
                 </div>
                 <div class="vertical-divider"></div>
                 <div class="link" (click)="onLinkClick(legalLinks[3])">
                   <span class="material-icons">{{legalLinks[3]?.icon || 'verified_user'}}</span>
                   <span>{{legalLinks[3]?.label || 'Compliance'}}</span>
                 </div>
               </div>
            </div>

            <!-- Regulatory Pair -->
            <div class="link-pair">
              <div class="pair-heading">{{sectionTitles?.regulatory || 'Regulatory'}}</div>
              <div class="pair-divider"></div>
                             <div class="pair-links">
                 <div class="link" (click)="onLinkClick(legalLinks[4])">
                   <span class="material-icons">{{legalLinks[4]?.icon || 'insights'}}</span>
                   <span>{{legalLinks[4]?.label || 'Disclosure'}}</span>
                 </div>
                 <div class="vertical-divider"></div>
                 <div class="link" (click)="onLinkClick(legalLinks[5])">
                   <span class="material-icons">{{legalLinks[5]?.icon || 'gavel'}}</span>
                   <span>{{legalLinks[5]?.label || 'Regulatory'}}</span>
                 </div>
               </div>
            </div>

            <!-- Credits Pair -->
            <div class="link-pair">
              <div class="pair-heading">{{credits?.title || 'Credits'}}</div>
              <div class="pair-divider"></div>
                             <div class="pair-links">
                 <div class="link" (click)="onLinkClick(credits?.links[0])">
                   <span class="material-icons">{{credits?.links[0]?.icon || 'code'}}</span>
                   <span>{{credits?.links[0]?.label || 'JENOZA'}}</span>
                 </div>
                 <div class="vertical-divider"></div>
                 <div class="link" (click)="onLinkClick(credits?.links[1])">
                   <span class="material-icons">{{credits?.links[1]?.icon || 'contact_support'}}</span>
                   <span>{{credits?.links[1]?.label || 'Contact'}}</span>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .tablet-footer {
      width: 100%;
      height: 100vh;
      font-family: 'Roboto', Arial, sans-serif;
      background: url('/images/footer/backgrounds/ft1.jpg') center/cover no-repeat;
      position: relative;
      padding-left: 0.5rem;
      padding-right: 0.5rem;
      display: flex;

      .footer-content {
        padding-top: 120px;
        width: 100%;
        min-width: 600px;
        max-width: 1400px;
        display: flex;
        flex-direction: column;
        margin: 0 auto;
        justify-content: center;
        align-items: center;

        .top-container {
          width: 90%;
          min-width: 600px;
          max-width: 1400px;
          min-height: 300px;
          max-height: 450px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px); /* Safari support */
          border-radius: 25px;
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
          position: relative;
          background: linear-gradient(
            135deg,
            rgba(215, 227, 255, 0.1) 0%,
            rgba(215, 227, 255, 0.2) 100%
          );
          margin: 0 auto 0 auto;
          padding: 0;
          display: grid;
          grid-template-columns: 1.5fr 1.5fr 2fr;
          gap: 0;
          overflow: hidden; /* Prevent content from leaving container */
          
        }

        /* New Top Row Above Columns */
        .top-row {
          grid-column: 1 / -1; /* Span all columns */
          width: 100%;
          min-height: 60px;
          max-height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 15px;
          margin-bottom: 0;
          padding: 0.5rem;
          text-align: center;
          

          .top-row-content {
            .top-row-title {
              font-size: 1.8rem;
              font-weight: 600;
              color: var(--primary-color);
              margin-bottom: 0.5rem;
              text-transform: none;
              letter-spacing: 0.02rem;
              text-shadow: none;
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            }

            .top-row-description {
              font-size: 0.9rem;
              font-weight: 600;
              color: var(--primary-color);
              opacity: 0.9;
              line-height: 1.4;
              letter-spacing: 0.05rem;
              text-transform: capitalize;
            }
          }
        }

        /* New Middle Row with Three Equal Columns */
        .middle-row {
          grid-column: 1 / -1; /* Span all columns */
          width: 100%;
          min-height: 100px;
          max-height: none;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 0;
          margin-bottom: 0;
          padding: 0;
          overflow: visible;

          .middle-column {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            color: white;
            padding: 0;
            width: 100%;
            height: 100%;
            overflow: visible;
            flex: 1; /* Ensure equal flex growth */
            min-width: 0; /* Allow shrinking if needed */

            /* Left padding for first column (logos) */
            &:first-child {
              padding-left: 1.5rem;
            }

            /* RTL padding class for logos */
            &.rtl-padding {
              padding-left: 0 !important;
              padding-right: 1.5rem !important;
            }





            .middle-title {
              font-size: 0.75rem;
              font-weight: 600;
              color: var(--primary-color);
              margin-bottom: 0.3rem;
            }

            .middle-text {
              font-size: 0.65rem;
              color: var(--primary-color);
              opacity: 0.8;
              line-height: 1.3;
            }

            /* Map Container Styles */
            .map-container {
              width: 100%;
              height: 100%;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: flex-start;
              padding: 0;
              margin: 0;
              overflow: visible;

              .location-header {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                margin-bottom: 0.3rem;
                padding: 0.3rem 0;

                .location-icon {
                  color: var(--primary-color);
                  font-size: 1.2rem;
                }

                .location-title {
                  font-size: 0.8rem;
                  font-weight: 600;
                  color: var(--primary-color);
                  margin: 0;
                }
              }

              .leaflet-map {
                width: 100%;
                height: calc(100% - 60px);
                border-radius: 100px 0 0 100px;
                overflow: hidden;
                border: 1px solid rgba(255, 255, 255, 0.2);
                flex: 1;
                min-height: 150px;

                /* RTL mode class */
                &.rtl-mode {
                  border-radius: 0 100px 100px 0;
                }
              }
            }
          }
        }

        .company-logo { 
          height: 100px;
          width: 100%;
          max-width: 100%;
          object-fit: contain;
          flex-shrink: 0;
          display: block;
          margin: 0 auto;
          align-self: center;
        }

        .ssl-logo { 
          height: 100px;
          width: 100%;
          max-width: 100%;
          object-fit: contain;
          flex-shrink: 0;
          align-self: flex-start;
          overflow: visible;
        }





        /* Content styles for middle columns */
        .stay-updated {
          padding: 0.5rem;
          text-align: center;
          color: white;
          width: 100%;
          min-height: 80px;
          max-height: 120px;
          overflow: hidden;
          
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
          
                                            .email-subscription {
                display: flex;
                align-items: stretch;
                gap: 0;
                width: 90%; /* Responsive width based on container */
                margin: 0 auto;
                direction: ltr; /* Override document RTL to maintain input-left, button-right order */

                .email-input {
                  flex: 1 1 0;
                  min-width: 80px; /* Minimum width to prevent over-shrinking */
                  height: 100%;
                  padding: 0.3rem 0.6rem; /* Reduced padding to save space */
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
                  padding: 0.3rem 0.6rem; /* Reduced padding to save space */
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
                  min-width: 70px; /* Minimum width */
                  max-width: 110px; /* Maximum width */
                  flex: 0 0 auto; /* Don't grow, don't shrink, auto size */
                  white-space: nowrap; /* Prevent text wrapping */
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
        
        .follow-us {
          padding: 0.5rem;
          text-align: center;
          color: white;
          width: 100%;
          min-height: 60px;
          max-height: 80px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          
          .section-title {
            color: var(--primary-color);
            font-size: 0.75rem;
            font-weight: 600;
            margin: 0 0 0.3rem 0;
            text-align: center;
          }
          
          .social-icons {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 0.5rem;
            flex-wrap: wrap;

            .social-icon {
              width: 24px;
              height: 24px;
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
                font-size: 0.7rem;
                width: 0.7rem;
                height: 0.7rem;
              }

              &:hover {
                background: var(--primary-color);
                opacity: 0.8;
                transform: translateY(-2px);
              }
            }
          }
        }
        
        /* New Full-Width Row Below Columns */
        .full-width-row {
          grid-column: 1 / -1; /* Span all columns */
          width: 100%;
          min-height: 45px;
          max-height: 55px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border-radius: 12px;
          
          .row-content {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0.5rem;
            
            .navigation-links {
              display: grid;
              grid-template-columns: repeat(4, 1fr);
              gap: 1rem;
              width: 100%;
              max-width: 600px;
              
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

                   /* RTL arrow direction */
                   &:dir(rtl)::after {
                     content: '↖';
                     margin-left: 0;
                     margin-right: 0.05rem;
                   }
              }
            }
          }
        }


        .bottom-container {
          width: 70%;
          min-width: 400px;
          max-width: 900px;
          min-height: 200px;
          max-height: 300px;
          background: #001B3F;
          border-radius: 0 0 25px 25px;
          margin: 0 auto;
          position: relative;
          padding: 1.25rem 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .company-info {
            text-align: center;
            .company-name {
              font-size: 1.0rem;
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
              font-size: 0.65rem;
              color: rgba(215, 227, 255, 0.75);
              margin-top: 0.2rem;
            }
          }

          .disclaimer {
            font-size: 0.7rem;
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
            /* Vertical centering */
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .links-grid {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr;
            gap: 0.5rem;
            padding: 0 0.35rem;

                         .link-pair {
               display: flex;
               flex-direction: column;
               align-items: center;
               gap: 0.1rem; /* Reduced gap to minimize space between elements */

              .pair-heading {
                font-size: 0.4rem;
                font-weight: 400;
                color: rgba(215, 227, 255, 0.9);
                text-align: center;
                letter-spacing: 0.5px;
              }

                             .pair-divider {
                 width: 100%;
                 height: 1px;
                 background: linear-gradient(
                   to right,
                   transparent 0%,
                   rgba(215, 227, 255, 0.3) 20%,
                   rgba(215, 227, 255, 0.6) 50%,
                   rgba(215, 227, 255, 0.3) 80%,
                   transparent 100%
                 );
                 margin: 0; /* No margin - absolutely no gap */
               }

                             .pair-links {
                 display: grid;
                 grid-template-columns: 1fr auto 1fr;
                 gap: 0.05rem;
                 width: 100%;
                 align-items: center;
                 margin: 0;
                 padding: 0;

                .link {
                  text-align: center;
                  padding: 0.05rem 0;
                  color: rgba(215, 227, 255, 0.8);
                  transition: color 0.2s;
                  cursor: pointer;
                  display: flex;
                  flex-direction: row;
                  align-items: center;
                  justify-content: center;
                  gap: 0.25rem;

                  .material-icons {
                    font-size: 0.4rem;
                    height: 0.4rem;
                    width: 0.4rem;
                    line-height: 0.4rem;
                  }

                  span:not(.material-icons) {
                    font-size: 0.4rem;
                    line-height: 1.1;
                  }

                                     &:hover {
                     color: rgba(215, 227, 255, 1);
                   }
                 }

                 .vertical-divider {
                   width: 1px;
                   height: 1rem;
                   background: linear-gradient(
                     to bottom,
                     rgba(215, 227, 255, 0.8) 0%, /* Thicker at top */
                     rgba(215, 227, 255, 0.7) 15%,
                     rgba(215, 227, 255, 0.6) 30%,
                     rgba(215, 227, 255, 0.4) 60%,
                     rgba(215, 227, 255, 0.2) 85%,
                     transparent 100% /* Thinner at bottom */
                   );
                   margin: 0 0.1rem;
                 }
               }
             }
           }
         }

        /* Tablet small styles */
        &.tablet-small {
          .footer-content {
            min-width: 600px;
            max-width: 800px;
            margin: 0 auto;
            padding-top: 100px;
          }

          .top-container {
            min-width: 600px;
            max-width: 800px;
            margin: 0 auto;
          }

          .bottom-container {
            min-width: 400px;
            max-width: 560px;
            margin: 0 auto;
          }
        }

        /* Tablet large styles */
        &.tablet-large {
          .footer-content {
            min-width: 800px;
            max-width: 1400px;
            margin: 0 auto;
            padding-top: 120px;
          }

          .top-container {
            min-width: 800px;
            max-width: 1400px;
            margin: 0 auto;
          }

          .bottom-container {
            min-width: 500px;
            max-width: 900px;
            margin: 0 auto;
          }
        }
      }

      /* RTL/Arabic specific styles */
      &:dir(rtl) {
        .bottom-container {
          .company-info .company-name {
            font-size: 1.3rem !important;
            font-weight: 600;
            letter-spacing: 0.3px;
          }

          .company-info .copyright {
            font-size: 0.9rem !important;
          }

          .disclaimer {
            font-size: 0.6rem !important;
          }

          .links-grid .link-pair .pair-heading {
            font-size: 0.55rem !important;
            font-weight: 500;
          }

          .links-grid .link-pair .pair-links .link {
            span:not(.material-icons) {
              font-size: 0.55rem !important;
            }
            .material-icons {
              font-size: 0.55rem !important;
              height: 0.55rem !important;
              width: 0.55rem !important;
              line-height: 0.55rem !important;
            }
          }


        }
      }
    }

    /* RTL border radius for leaflet map */
    .tablet-footer[dir="rtl"] .middle-column .map-container .leaflet-map,
    [dir="rtl"] .tablet-footer .middle-column .map-container .leaflet-map,
    html[dir="rtl"] .tablet-footer .middle-column .map-container .leaflet-map {
      border-radius: 0 100px 100px 0 !important;
    }







  `]
})
export class TabletFooterComponent implements OnDestroy, AfterViewInit {
  @Input() childData: any;

  currentLang: 'en' | 'ar' = 'en';
  companyInfo: any;
  disclaimer: string = '';
  legalLinks: any[] = [];
  credits: any;
  sectionTitles: any;
  
  // Top container content properties
  topRowData: any;
  topContentData: any;
  locationData: any;
  quickConnectData: any;
  
  // Leaflet map properties
  private leafletLib: any | null = null;
  private leafletMap: any | null = null;
  private leafletMarker: any | null = null;
  
  private subscription: Subscription = new Subscription();

  constructor(
    private footerContentService: FooterContentService,
    private languageService: LanguageService,
    private zone: NgZone,
    private router: Router
  ) {
    // Get initial language
    const initialLang = this.languageService.getCurrentLanguage()?.code || 'en';
    this.currentLang = (initialLang === 'en' || initialLang === 'ar') ? initialLang : 'en';
    
    // Subscribe to language changes
    this.subscription.add(
      this.languageService.currentLang$.subscribe(lang => {
        if (lang === 'en' || lang === 'ar') {
          this.currentLang = lang;
          // Set document direction for RTL support
          document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
          this.loadContent();
        }
      })
    );
    
    // Initial load
    this.loadContent();
  }

  ngAfterViewInit(): void {
    // Load initial content
    this.loadContent();
    
    // Add delay to ensure DOM and CSS are fully loaded
    setTimeout(() => {
      this.initializeMap();
    }, 150);

    // Set up automatic map recovery
    this.setupMapRecovery();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /**
   * Set up automatic map recovery to handle CSS changes and re-renders
   */
  private setupMapRecovery(): void {
    // Check map every 2 seconds and reinitialize if it's missing
    const mapCheckInterval = setInterval(() => {
      const mapContainer = document.getElementById('tablet-footer-leaflet-map');
      if (mapContainer && !(mapContainer as any)._leaflet_id && this.leafletLib && !this.leafletMap) {
        console.log('Map container found but map not initialized, reinitializing...');
        this.initializeMap();
      }
    }, 2000);

    // Store interval reference for cleanup
    this.subscription.add(() => clearInterval(mapCheckInterval));

    // Also listen for window resize events to reinitialize map
    const resizeHandler = () => {
      if (this.leafletMap) {
        setTimeout(() => {
          this.leafletMap.invalidateSize();
        }, 100);
      }
    };

    window.addEventListener('resize', resizeHandler);
    this.subscription.add(() => window.removeEventListener('resize', resizeHandler));
  }

  /**
   * Load content from the footer content service
   */
  private loadContent() {
    // Bottom container content
    this.companyInfo = this.footerContentService.getCompanyInfo(this.currentLang);
    this.disclaimer = this.footerContentService.getDisclaimer(this.currentLang);
    this.legalLinks = this.footerContentService.getLegalLinks(this.currentLang);
    this.credits = this.footerContentService.getCredits(this.currentLang);
    this.sectionTitles = this.footerContentService.getSectionTitles(this.currentLang);
    
    // Top container content
    this.topRowData = this.footerContentService.getTopRowContent(this.currentLang);
    this.topContentData = this.footerContentService.getLogos(this.currentLang);
    this.locationData = this.footerContentService.getLocationData(this.currentLang);
    this.quickConnectData = this.footerContentService.getQuickConnectData(this.currentLang);
    
    // Refresh map content when language changes
    this.refreshLeafletMap();
  }

  onLinkClick(link: any) {
    if (link?.url) {
      window.open(link.url, '_blank');
    }
    if (link?.action) {
      // Handle action
    }
  }

  onSocialClick(social: any) {
    if (social?.url) {
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

  trackByLink(index: number, link: any) {
    return link?.id || index;
  }

  /**
   * Initialize the leaflet map
   */
  private initializeMap(retryCount: number = 0): void {
    // Maximum retry attempts
    const maxRetries = 3;
    
    this.zone.runOutsideAngular(() => {
      try {
        const mapContainer = document.getElementById('tablet-footer-leaflet-map');
        
        // Check if container exists and has proper dimensions
        if (!mapContainer) {
          console.warn('Tablet footer map container not found, retrying...');
          if (retryCount < maxRetries) {
            setTimeout(() => this.initializeMap(retryCount + 1), 200);
          }
          return;
        }

        // Check if container has proper dimensions and is visible
        if (mapContainer.offsetHeight === 0 || mapContainer.offsetWidth === 0 || 
            mapContainer.style.display === 'none' || mapContainer.style.visibility === 'hidden') {
          console.warn('Tablet footer map container has no dimensions or is hidden, retrying...');
          if (retryCount < maxRetries) {
            setTimeout(() => this.initializeMap(retryCount + 1), 200);
          }
          return;
        }

        // Check if map is already initialized
        if ((mapContainer as any)._leaflet_id || (this.leafletLib && this.leafletMap)) {
          console.log('Tablet footer map already initialized');
          return;
        }

        // Clear any existing map instance
        if (this.leafletMap) {
          this.leafletMap.remove();
          this.leafletMap = null;
          this.leafletMarker = null;
        }

        // Lazy-load Leaflet
        import('leaflet').then((L) => {
          if (!L || !L.Icon || !L.Icon.Default) {
            throw new Error('Leaflet library loaded but missing required components');
          }
          
          this.leafletLib = L;
          
          // Ensure default marker icons load
          const iconBase = 'https://unpkg.com/leaflet@1.9.4/dist/images/';
          this.leafletLib.Icon.Default.mergeOptions({
            iconRetinaUrl: iconBase + 'marker-icon-2x.png',
            iconUrl: iconBase + 'marker-icon.png',
            shadowUrl: iconBase + 'marker-shadow.png'
          });

          const map = this.leafletLib.map('tablet-footer-leaflet-map', {
            zoomControl: false,
            attributionControl: false,
            // Enable all interactions for full functionality
            dragging: true,
            touchZoom: true,
            doubleClickZoom: true,
            scrollWheelZoom: true,
            boxZoom: true,
            keyboard: true,
            tap: true
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
          
          console.log('Tablet footer map initialized successfully');
        }).catch((error) => {
          console.error('Failed to load Leaflet for tablet footer:', error);
          
          // Clear any partial state
          this.leafletLib = null;
          this.leafletMap = null;
          this.leafletMarker = null;
          
          // Show fallback content or retry
          if (retryCount < maxRetries) {
            console.log(`Retrying Leaflet initialization (${retryCount + 1}/${maxRetries})...`);
            setTimeout(() => this.initializeMap(retryCount + 1), 1000);
          } else {
            console.warn('Max retries reached, Leaflet map will not be displayed');
            // Optionally show a fallback message or disable map functionality
          }
        });
      } catch (error) {
        console.error('Tablet footer map initialization error:', error);
        if (retryCount < maxRetries) {
          setTimeout(() => this.initializeMap(retryCount + 1), 300);
        }
      }
    });
  }

  /**
   * Refresh the leaflet map content (marker + popup) when language changes
   */
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
        html: '<div style="width: 24px; height: 24px; background: #D7E3FF; border-radius: 50%; border: 2px solid #001B3F; box-shadow: 0 2px 4px rgba(0,0,0,0.2); display: flex; align-items: center; justify-content: center;"><svg style="width: 16px; height: 16px; fill: #001B3F;" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg></div>',
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