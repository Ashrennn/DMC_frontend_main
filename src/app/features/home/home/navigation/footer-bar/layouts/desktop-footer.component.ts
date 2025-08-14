import { Component, Input, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FooterContentService } from '../content/footer-content.service';
import { LanguageService } from '../../../../../../shared/services/language.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'dmc-desktop-footer',
  standalone: true,
  imports: [CommonModule, MatIconModule],
    template: `
    <div class="desktop-footer">
             <div class="top-container">
         <div class="top-division">
           <div class="first-row">
             <div class="top-column-1">
               <div class="chamber-image-container sharjah-container">
                 <!-- Sharjah image background -->
               </div>
             </div>
             <div class="top-column-2">
               <div class="top-row-content">
                 <h2 class="top-row-title">{{topRowData?.title}}</h2>
                 <p class="top-row-description">{{topRowData?.description}}</p>
               </div>
             </div>
             <div class="top-column-3">
               <div class="chamber-image-container icc-container">
                 <!-- ICC image background -->
               </div>
             </div>
           </div>
           <div class="second-row">
                           <div class="column-1">
                <div class="logo-container">
                 <div class="logo-section top-logo">
                   <img [src]="'/images/footer/icons/dmc.png'" 
                        alt="DMC Company Logo" 
                        class="company-logo">
                 </div>
                 <div class="logo-section bottom-logo">
                   <img [src]="'/images/footer/icons/ssl.png'" 
                        alt="SSL Certificate" 
                        class="ssl-logo">
                 </div>
               </div>
             </div>
                                                       <div class="column-2">
                                  <div class="quick-connect-container">
                   
                   
                                       <!-- Stay Updated Email Signup -->
                    <div class="stay-updated">
                      <h4 class="section-title">
                        <mat-icon class="section-icon">link</mat-icon>
                        {{quickConnectData?.stayUpdated?.title}}
                      </h4>
                      <div class="stay-updated-divider"></div>
                     <p class="section-description">{{quickConnectData?.stayUpdated?.description}}</p>
                                                                                       <div class="email-subscription">
                         <input type="email" 
                                [placeholder]="quickConnectData?.stayUpdated?.emailPlaceholder" 
                                class="email-input">
                                                                                                     <button class="subscribe-btn">
                                                     <mat-icon>send</mat-icon>
                                                   </button>
                       </div>
                   </div>
                   
                                       <!-- Follow Us Social Media -->
                    <div class="follow-us">
                      <h4 class="section-title">
                        <mat-icon class="section-icon">share</mat-icon>
                        {{quickConnectData?.followUs?.title}}
                      </h4>
                      <div class="follow-us-divider"></div>
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
              </div>
                                                       <div class="column-3">
                                   <div class="sitemap-container">
                   <h4 class="sitemap-title">
                     <mat-icon class="section-icon">map</mat-icon>
                     {{topSectionTitles?.siteMap}}
                   </h4>
                  <div class="sitemap-divider"></div>
                  
                  <!-- Sitemap Content -->
                  <div class="sitemap-content">
                    <!-- Home Section -->
                    <div class="sitemap-section">
                      <h5 class="section-title">{{currentLang === 'ar' ? 'الرئيسية' : 'Home'}}</h5>
                      <div class="section-divider"></div>
                      <div class="section-links">
                        <div class="sitemap-link">
                          <mat-icon class="link-icon">home</mat-icon>
                          <span class="link-text">{{currentLang === 'ar' ? 'الرئيسية' : 'Home'}}</span>
                        </div>
                      </div>
                    </div>
                    
                    <!-- About Us Section -->
                    <div class="sitemap-section">
                      <h5 class="section-title">{{currentLang === 'ar' ? 'من نحن' : 'About Us'}}</h5>
                      <div class="section-divider"></div>
                      <div class="section-links">
                        <div class="sitemap-link">
                          <mat-icon class="link-icon">refresh</mat-icon>
                          <span class="link-text">{{currentLang === 'ar' ? 'تاريخنا' : 'Our History'}}</span>
                        </div>
                        <div class="sitemap-link">
                          <mat-icon class="link-icon">info</mat-icon>
                          <span class="link-text">{{currentLang === 'ar' ? 'ماذا نفعل' : 'What We Do'}}</span>
                        </div>
                        <div class="sitemap-link">
                          <mat-icon class="link-icon">people</mat-icon>
                          <span class="link-text">{{currentLang === 'ar' ? 'أشخاصنا' : 'Our People'}}</span>
                        </div>
                        <div class="sitemap-link">
                          <mat-icon class="link-icon">favorite</mat-icon>
                          <span class="link-text">{{currentLang === 'ar' ? 'قيمنا' : 'Our Values'}}</span>
                        </div>
                      </div>
                    </div>
                    
                    <!-- Operations Section -->
                    <div class="sitemap-section">
                      <h5 class="section-title">{{currentLang === 'ar' ? 'العمليات' : 'Operations'}}</h5>
                      <div class="section-divider"></div>
                      <div class="section-links">
                        <div class="sitemap-link">
                          <mat-icon class="link-icon">my_location</mat-icon>
                          <span class="link-text">Damilube</span>
                        </div>
                        <div class="sitemap-link">
                          <mat-icon class="link-icon">business</mat-icon>
                          <span class="link-text">{{currentLang === 'ar' ? 'العمليات' : 'Operations'}}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                           <div class="column-4">
                                 <div class="downloads-container">
                   <h4 class="downloads-title">
                     <mat-icon class="section-icon">download</mat-icon>
                     {{topSectionTitles?.downloads}}
                   </h4>
                  <div class="downloads-divider"></div>
                  
                                    <!-- Downloads Categories -->
                  <div class="downloads-content">
                    <div class="download-category" *ngFor="let category of downloadsData">
                      <h5 class="category-title">{{category.title}}</h5>
                      <div class="documents-list">
                        <div class="document-item" *ngFor="let document of category.documents" (click)="onDocumentClick(document)">
                          <mat-icon class="pdf-icon">{{document.icon}}</mat-icon>
                          <span class="document-name">{{document.name}}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                                                       <div class="column-5">
                                   <div class="location-container">
                    <h4 class="location-title">
                      <mat-icon class="section-icon">location_on</mat-icon>
                      {{topSectionTitles?.ourLocation}}
                    </h4>
                   <div class="location-divider"></div>
                   <div id="desktop-footer-leaflet-map" class="leaflet-map" [ngClass]="{'rtl-mode': currentLang === 'ar'}"></div>
                </div>
              </div>
           </div>
         </div>
       </div>
           <div class="bottom-container" [class.rtl-mode]="currentLang === 'ar'">
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
  `,
  styles: [`
    .desktop-footer {
      background: url('/images/footer/backgrounds/ft1.jpg') center/cover no-repeat;
      height: 100vh;
      width: 100vw;
      margin-left: calc(-50vw + 50%);
      margin-right: calc(-50vw + 50%);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .top-container {
      width: 100%;
      min-width: 600px;
      max-width: 1200px;
      min-height: 300px;
      max-height: 450px;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border-radius: 20px;
      margin-bottom: 0;
      padding: 1rem 0 1rem 0;

             .top-division {
         width: 100%;
         height: 100%;
         padding: 0;

         box-sizing: border-box;
         display: flex;
         flex-direction: column;

                                                                                                                                               .first-row {
             height: 80px;
             min-height: 80px;

             border-bottom: 1px solid rgba(255, 255, 255, 0.1);

             box-sizing: border-box;
             display: grid;
             grid-template-columns: 1fr 2fr 1fr;
             gap: 0;
             padding: 0;
           
           .top-column-1, .top-column-2, .top-column-3 {

             box-sizing: border-box;
             display: flex;
             align-items: center;
             justify-content: center;
           }
           
           .top-row-content {
             text-align: center;
             
                           .top-row-title {
                font-size: 1.4rem;
                font-weight: 600;
                color: var(--primary-color);
                margin: 0 0 0.3rem 0;
                text-transform: none;
                letter-spacing: 0.02rem;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              }
              
              .top-row-description {
                font-size: 0.8rem;
                font-weight: 600;
                color: var(--primary-color);
                opacity: 0.9;
                line-height: 1.2;
                letter-spacing: 0.05rem;
                text-transform: capitalize;
                margin: 0;
              }
           }
           
           .chamber-image-container {
             width: 100%;
             height: 100%;
             background-size: cover;
             background-position: center;
             background-repeat: no-repeat;
             border-radius: 15px;
             opacity: 0.8;
             transition: opacity 0.3s ease;
             
             &:hover {
               opacity: 1;
             }
             
             &.sharjah-container {
               background-image: url('/images/footer/chamber/sharjah.png');
             }
             
             &.icc-container {
               background-image: url('/images/footer/chamber/icc.png');
             }
           }
         }

                                                                       .second-row {
             flex: 0.8;
             display: grid;
             grid-template-columns: 1.5fr 1fr 1fr 1fr 1.5fr;
             gap: 1rem;
             margin-top: 1rem;
             box-sizing: border-box;
           }

                 .column-1, .column-2, .column-3, .column-4, .column-5 {

           box-sizing: border-box;
           position: relative;

                     
           
                       .logo-container {
              width: 100%;
              height: 100%;
              display: flex;
              flex-direction: column;
              padding: 0;
             
             .logo-section {
               flex: 1;
               display: flex;
               align-items: center;
               justify-content: center;
               padding: 0.5rem;
               

               
                                                               .company-logo {
                   max-width: 95%;
                   max-height: 95%;
                   object-fit: contain;
                   opacity: 0.9;
                   transform: scale(1.3);
                   transform-origin: center;
                 }
                 
                                   .ssl-logo {
                    max-width: 90%;
                    max-height: 90%;
                    object-fit: contain;
                    opacity: 0.8;
                    transform: scale(1.5);
                    transform-origin: center;
                  }
             }
                       }
            
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               .quick-connect-container {
                      width: 100%;
                      height: 100%;
                      padding: 0;
                      display: flex;
                      flex-direction: column;
                      gap: 0;
                      background: transparent;
                      border-radius: 0;
                      border: none;
                      backdrop-filter: none;
                      box-shadow: none;
                
                                 .quick-connect-header {
                   display: flex;
                   align-items: center;
                   gap: 0.4rem;
                   margin-bottom: 0;
                  
                  .connect-icon {
                    font-size: 1.4rem;
                    color: var(--primary-color);
                  }
                  
                                     .header-title {
                     font-size: 0.9rem;
                     font-weight: 600;
                     color: var(--primary-color);
                     margin: 0;
                     text-transform: none;
                     letter-spacing: 0.5px;
                     font-family: inherit;
                   }
                }
                
                                 .header-divider {
                   width: 100%;
                   height: 1px;
                   background: var(--primary-color);
                   margin-bottom: 0;
                 }
               
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       .stay-updated {
                    text-align: left;
                    margin-bottom: 1.2rem;
                    padding: 0;
                    background: transparent;
                    border-radius: 0;
                    border: none;
                    position: relative;
                    overflow: visible;
                  
                                     &::before {
                     display: none;
                   }
                  
                                         .section-title {
                       font-size: 0.8rem;
                       font-weight: 500;
                       color: var(--primary-color);
                       margin: 0 0 0.8rem 0;
                       text-transform: none;
                       letter-spacing: 0.5px;
                       font-family: 'Roboto', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                       text-decoration: none;
                       position: relative;
                       display: flex;
                       align-items: center;
                       gap: 0.5rem;
                       
                       .section-icon {
                         font-size: 1rem;
                         width: 1rem;
                         height: 1rem;
                         color: var(--primary-color);
                       }
                       
                       &::after {
                         content: '';
                         position: absolute;
                         bottom: -4px;
                         left: 0;
                         width: 100%;
                         height: 0.5px;
                         background: rgba(var(--primary-color-rgb), 0.3);
                       }
                     }
                    
                      .section-description {
                        font-size: 0.7rem;
                        font-weight: 400;
                        color: rgba(var(--primary-color-rgb), 0.8);
                        line-height: 1.4;
                        letter-spacing: 0.4px;
                        text-transform: none;
                        margin: 0 0 1.5rem 0;
                        font-family: 'Roboto', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                      }
                      
                      .stay-updated-divider {
                        width: 100%;
                        height: 1px;
                        background: var(--primary-color);
                        margin: 0 0 0.8rem 0;
                        border-radius: 0.5px;
                      }
                
                                                                                                                                                                                                           .email-subscription {
                     display: flex;
                     flex-direction: row;
                     gap: 0;
                     align-items: center;
                     width: 100%;
                     margin: 0;
                     direction: ltr; /* Override document RTL to maintain input-left, button-right order */
                     height: 28px;
                     border-radius: 14px;
                     overflow: hidden;
                     box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                     transition: all 0.3s ease;

                     &:hover {
                       transform: translateY(-2px);
                       box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
                     }

                    .email-input {
                      flex: 1 1 0;
                      min-width: 80px;
                      height: 100%;
                      padding: 0 1rem;
                      border: none;
                      border-radius: 14px 0 0 14px;
                      background: rgba(255, 255, 255, 0.95);
                      color: var(--primary-color);
                      font-size: 0.75rem;
                      text-align: left;
                      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                      transition: all 0.3s ease;

                      &::placeholder {
                        color: rgba(var(--primary-color-rgb), 0.6);
                        text-align: left;
                      }

                      &:focus {
                        outline: none;
                        background: rgba(255, 255, 255, 1);
                        box-shadow: inset 0 0 0 2px var(--primary-color);
                      }

                      /* RTL support for Arabic */
                      [dir="rtl"] & {
                        border-radius: 0 14px 14px 0;
                        text-align: right;
                      }
                    }

                                         .subscribe-btn {
                       padding: 0;
                       background: linear-gradient(135deg, var(--primary-color) 0%, rgba(var(--primary-color-rgb), 0.9) 100%);
                       color: white;
                       border: none;
                       border-radius: 0 14px 14px 0;
                       cursor: pointer;
                       transition: all 0.3s ease;
                       height: 100%;
                       width: 28px;
                       flex: 0 0 28px;
                       display: flex;
                       align-items: center;
                       justify-content: center;

                       mat-icon {
                         font-size: 1rem;
                         width: 1rem;
                         height: 1rem;
                       }

                       &:hover {
                         background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-color) 100%);
                         transform: scale(1.05);
                       }

                       &:active {
                         transform: scale(0.98);
                       }

                       /* RTL support for Arabic */
                       [dir="rtl"] & {
                         border-radius: 14px 0 0 14px;
                       }
                     }
                  }
              }
              
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             .follow-us {
                    text-align: left;
                    padding: 0;
                    background: transparent;
                    border-radius: 0;
                    border: none;
                    position: relative;
                    overflow: visible;
                    margin-top: 0;
                  
                  &::before {
                    display: none;
                  }
                  
                                         .section-title {
                       font-size: 0.8rem;
                       font-weight: 500;
                       color: var(--primary-color);
                       margin: 0 0 0.8rem 0;
                       text-transform: none;
                       letter-spacing: 0.5px;
                       font-family: 'Roboto', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                       text-decoration: none;
                       position: relative;
                       display: flex;
                       align-items: center;
                       gap: 0.5rem;
                       
                       .section-icon {
                         font-size: 1rem;
                         width: 1rem;
                         height: 1rem;
                         color: var(--primary-color);
                       }
                       
                       &::after {
                         content: '';
                         position: absolute;
                         bottom: -4px;
                         left: 0;
                         width: 100%;
                         height: 0.5px;
                         background: rgba(var(--primary-color-rgb), 0.3);
                       }
                     }
                     
                     .follow-us-divider {
                       width: 100%;
                       height: 1px;
                       background: var(--primary-color);
                       margin: 0 0 0.8rem 0;
                       border-radius: 0.5px;
                     }
                 
                                  .social-icons {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    gap: 0.8rem;
                    flex-wrap: wrap;

                                       .social-icon {
                      width: 28px;
                      height: 28px;
                      border: 2px solid rgba(var(--primary-color-rgb), 0.3);
                      border-radius: 50%;
                      background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
                      color: var(--primary-color);
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      cursor: pointer;
                      transition: all 0.3s ease;
                      position: relative;
                      overflow: hidden;

                     &::before {
                       content: '';
                       position: absolute;
                       top: 0;
                       left: 0;
                       right: 0;
                       bottom: 0;
                       background: linear-gradient(135deg, var(--primary-color) 0%, rgba(var(--primary-color-rgb), 0.8) 100%);
                       opacity: 0;
                       transition: opacity 0.3s ease;
                     }

                     mat-icon {
                       font-size: 0.9rem;
                       width: 0.9rem;
                       height: 0.9rem;
                       position: relative;
                       z-index: 1;
                       color: var(--primary-color);
                       transition: color 0.3s ease;
                     }

                     &:hover {
                       border-color: var(--primary-color);
                       transform: translateY(-3px) scale(1.1);
                       box-shadow: 0 8px 20px rgba(var(--primary-color-rgb), 0.3);
                       
                       &::before {
                         opacity: 1;
                       }
                       
                       mat-icon {
                         color: white;
                       }
                     }
                     
                     &:active {
                       transform: translateY(-1px) scale(1.05);
                     }
                   }
                 }
                             }
             }
             
                                                   .sitemap-container {
                width: 100%;
                height: 100%;
                padding: 0;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                justify-content: flex-start;
               
                                                               .sitemap-title {
                   font-size: 0.8rem;
                   font-weight: 500;
                   color: var(--primary-color);
                   margin: 0 0 0.8rem 0;
                   text-transform: none;
                   letter-spacing: 0.8px;
                   font-family: 'Segoe UI', Tahoma, Geneva, Verdana, Verdana, sans-serif;
                   text-decoration: none;
                   position: relative;
                   display: flex;
                   align-items: center;
                   gap: 0.5rem;
                   
                   .section-icon {
                     font-size: 1rem;
                     width: 1rem;
                     height: 1rem;
                     color: var(--primary-color);
                   }
                   
                   &::after {
                     content: '';
                     position: absolute;
                     bottom: -4px;
                     left: 0;
                     width: 100%;
                     height: 0.5px;
                     background: rgba(var(--primary-color-rgb), 0.3);
                   }
                 }
               
                               .sitemap-divider {
                  width: 100%;
                  height: 1px;
                  background: var(--primary-color);
                  margin: 0 0 0.8rem 0;
                  border-radius: 0.5px;
                }
                
                .sitemap-content {
                  width: 100%;
                  max-height: 200px;
                  overflow-y: auto;
                  overflow-x: hidden;
                  scrollbar-width: none; /* Firefox */
                  -ms-overflow-style: none; /* IE and Edge */
                  
                  &::-webkit-scrollbar {
                    display: none; /* Chrome, Safari, Opera */
                  }
                  
                  display: flex;
                  flex-direction: column;
                  gap: 0.8rem;
                }
                
                .sitemap-section {
                  width: 100%;
                  
                  .section-title {
                    font-size: 0.75rem;
                    font-weight: 600;
                    color: var(--primary-color);
                    margin: 0 0 0.2rem 0;
                    text-transform: none;
                    letter-spacing: 0.3px;
                    font-family: 'Roboto', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    position: relative;
                    display: inline-block;
                    
                    &::after {
                      content: '';
                      position: absolute;
                      bottom: -2px;
                      left: 0;
                      width: 100%;
                      height: 0.5px;
                      background: var(--primary-color);
                      border-radius: 0.25px;
                    }
                  }
                  
                  .section-divider {
                    display: none;
                  }
                  
                  .section-links {
                    display: flex;
                    flex-direction: column;
                    gap: 0.1rem;
                    margin-top: 0.3rem;
                  }
                  
                  .sitemap-link {
                    display: flex;
                    align-items: center;
                    gap: 0.4rem;
                    padding: 0.15rem 0;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    
                    &:hover {
                      transform: translateX(3px);
                      
                      .link-text {
                        color: var(--primary-color);
                      }
                      
                      .link-icon {
                        color: var(--primary-color);
                        transform: scale(1.1);
                      }
                    }
                    
                    .link-icon {
                      font-size: 0.8rem;
                      width: 0.8rem;
                      height: 0.8rem;
                      color: var(--primary-color);
                      transition: all 0.2s ease;
                    }
                    
                    .link-text {
                      font-size: 0.6rem;
                      font-weight: 400;
                      color: var(--primary-color);
                      text-transform: none;
                      letter-spacing: 0.2px;
                      font-family: 'Roboto', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                      transition: color 0.2s ease;
                    }
                  }
                }
             }
             
             .downloads-container {
               width: 100%;
               height: 100%;
               padding: 0;
               display: flex;
               flex-direction: column;
               align-items: flex-start;
               justify-content: flex-start;
             
                                                               .downloads-title {
                   font-size: 0.8rem;
                   font-weight: 500;
                   color: var(--primary-color);
                   margin: 0 0 0.8rem 0;
                   text-transform: none;
                   letter-spacing: 0.5px;
                   font-family: 'Roboto', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                   text-decoration: none;
                   position: relative;
                   display: flex;
                   align-items: center;
                   gap: 0.5rem;
                   
                   .section-icon {
                     font-size: 1rem;
                     width: 1rem;
                     height: 1rem;
                     color: var(--primary-color);
                   }
                   
                   &::after {
                     content: '';
                     position: absolute;
                     bottom: -4px;
                     left: 0;
                     width: 100%;
                     height: 0.5px;
                     background: rgba(var(--primary-color-rgb), 0.3);
                   }
                 }
               
                               .downloads-divider {
                  width: 100%;
                  height: 1px;
                  background: var(--primary-color);
                  margin: 0 0 0.8rem 0;
                  border-radius: 0.5px;
                }
                
                .downloads-content {
                  width: 100%;
                  max-height: 200px;
                  overflow-y: auto;
                  overflow-x: hidden;
                  scrollbar-width: none; /* Firefox */
                  -ms-overflow-style: none; /* IE and Edge */
                  
                  &::-webkit-scrollbar {
                    display: none; /* Chrome, Safari, Opera */
                  }
                  
                  display: flex;
                  flex-direction: column;
                  gap: 0.6rem;
                }
                
                .download-category {
                  width: 100%;
                  
                  .category-title {
                    font-size: 0.75rem;
                    font-weight: 600;
                    color: var(--primary-color);
                    margin: 0 0 0.2rem 0;
                    text-transform: none;
                    letter-spacing: 0.3px;
                    font-family: 'Roboto', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    position: relative;
                    display: inline-block;
                    
                    &::after {
                      content: '';
                      position: absolute;
                      bottom: -2px;
                      left: 0;
                      width: 100%;
                      height: 0.5px;
                      background: var(--primary-color);
                      border-radius: 0.25px;
                    }
                  }
                  
                  .category-divider {
                    display: none;
                  }
                  
                  .documents-list {
                    display: flex;
                    flex-direction: column;
                    gap: 0.1rem;
                    margin-top: 0.3rem;
                  }
                  
                  .document-item {
                    display: flex;
                    align-items: center;
                    gap: 0.4rem;
                    padding: 0.15rem 0;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    
                    &:hover {
                      transform: translateX(3px);
                      
                      .pdf-icon {
                        transform: scale(1.1);
                      }
                    }
                    
                    .pdf-icon {
                      font-size: 0.8rem;
                      width: 0.8rem;
                      height: 0.8rem;
                      color: var(--primary-color);
                      transition: all 0.2s ease;
                    }
                    
                    .document-name {
                      font-size: 0.6rem;
                      font-weight: 400;
                      color: var(--primary-color);
                      text-transform: none;
                      letter-spacing: 0.2px;
                      font-family: 'Roboto', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                      transition: color 0.2s ease;
                    }
                  }
                }
             }
             
                                                   .location-container {
               width: 100%;
               height: 100%;
               padding: 0;
               display: flex;
               flex-direction: column;
               align-items: flex-start;
               justify-content: flex-start;
             
                                                               .location-title {
                   font-size: 0.8rem;
                   font-weight: 500;
                   color: var(--primary-color);
                   margin: 0 0 0.8rem 0;
                   text-transform: none;
                   letter-spacing: 0.5px;
                   font-family: 'Roboto', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                   text-decoration: none;
                   position: relative;
                   display: flex;
                   align-items: center;
                   gap: 0.5rem;
                   
                   .section-icon {
                     font-size: 1rem;
                     width: 1rem;
                     height: 1rem;
                     color: var(--primary-color);
                   }
                   
                   &::after {
                     content: '';
                     position: absolute;
                     bottom: -4px;
                     left: 0;
                     width: 100%;
                     height: 0.5px;
                     background: rgba(var(--primary-color-rgb), 0.3);
                   }
                 }
               
                               .location-divider {
                  width: 100%;
                  height: 1px;
                  background: var(--primary-color);
                  margin: 0 0 0.8rem 0;
                  border-radius: 0.5px;
                }
               
               .leaflet-map {
                 flex: 1;
                 width: 100%;
                 height: 100%;
                 border-radius: 80px 0 0 80px;
                 overflow: hidden;
                 
                 &.rtl-mode {
                   border-radius: 0 80px 80px 0;
                 }
               }
            }
        }
      }
      box-shadow: 0 8px 32px rgba(0, 27, 63, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

         .bottom-container {
       width: 70%;
       min-width: 400px;
       max-width: 1000px;
       min-height: 200px;
       max-height: 300px;
       background: #001B3F;
       border-radius: 0 0 25px 25px;
       margin: 0 auto;
       position: relative;
       padding: 1rem 1rem 1.5rem 1rem;

      
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
         font-size: 0.65rem;
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

             /* RTL specific styling for Arabic text */
       &.rtl-mode {
         .company-info {
           .company-name {
             font-size: 1.5rem; /* Increased from 1.0rem */
             
             .registered {
               font-size: 0.7rem; /* Increased from 0.45rem */
             }
           }

           .copyright {
             font-size: 1.0rem; /* Increased from 0.65rem */
           }
         }

                   .disclaimer {
            font-size: 0.9rem; /* Reduced from 1.0rem for RTL */
          }

         .links-grid {
           .link-pair {
             .pair-heading {
               font-size: 0.7rem; /* Increased from 0.4rem */
             }

             .pair-links {
               .link {
                 span:not(.material-icons) {
                   font-size: 0.7rem; /* Increased from 0.4rem */
                 }
               }
             }
           }
         }
       }
    }
  `]
})
export class DesktopFooterComponent implements OnInit, OnDestroy {
  @Input() childData: any;
  
  currentLang: 'en' | 'ar' = 'en';
  companyInfo: any;
  disclaimer: string = '';
  legalLinks: any[] = [];
  credits: any;
  sectionTitles: any;
  topRowData: any;
  locationData: any;
  quickConnectData: any;
  downloadsData: any[] = [];
  topSectionTitles: any;
  
  // Leaflet map properties
  private leafletLib: any | null = null;
  private leafletMap: any | null = null;
  private leafletMarker: any | null = null;
  
  private subscription: Subscription = new Subscription();
  
  constructor(
    private footerContentService: FooterContentService,
    private languageService: LanguageService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Get initial language
    const initialLang = this.languageService.getCurrentLanguage()?.code || 'en';
    this.currentLang = (initialLang === 'en' || initialLang === 'ar') ? initialLang : 'en';
    
    // Subscribe to language changes
            this.subscription.add(
          this.languageService.currentLang$.subscribe(lang => {
            if (lang === 'en' || lang === 'ar') {
              this.currentLang = lang;
              // Set document direction for RTL support (only in browser)
              if (isPlatformBrowser(this.platformId)) {
                document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
              }
              this.loadContent();
              // Refresh map with new language content
              setTimeout(() => this.refreshLeafletMap(), 100);
            }
          })
        );
    
    // Initial load
    this.loadContent();
  }

           ngOnInit() {
      // Initial load
      this.loadContent();
      // Only try to initialize map in browser environment
      if (isPlatformBrowser(this.platformId)) {
        setTimeout(() => {
          if (document.getElementById('desktop-footer-leaflet-map')) {
            this.initializeMap();
          } else {
            console.warn('Map container not found in ngOnInit, retrying...');
            setTimeout(() => this.initializeMap(), 500);
          }
        }, 300);
      }
    }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    // Clean up map when component is destroyed
    if (this.leafletMap) {
      this.leafletMap.remove();
      this.leafletMap = null;
      this.leafletMarker = null;
    }
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
       this.locationData = this.footerContentService.getLocationData(this.currentLang);
       this.quickConnectData = this.footerContentService.getQuickConnectData(this.currentLang);
       this.downloadsData = this.footerContentService.getDownloadsData(this.currentLang);
       this.topSectionTitles = this.footerContentService.getTopSectionTitles(this.currentLang);
    }

  onLinkClick(link: any) {
    if (link?.url) {
      window.open(link.url, '_blank');
    }
    if (link?.action) {
      // Handle action
    }
  }

  onDocumentClick(document: any) {
    if (document?.url) {
      window.open(document.url, '_blank');
    }
  }

  onSocialClick(social: any) {
    if (social?.url) {
      window.open(social.url, '_blank');
    }
  }

  /**
   * Initialize the leaflet map
   */
  private initializeMap(): void {
    // Check if running in browser first
    if (!isPlatformBrowser(this.platformId)) {
      return; // Don't initialize map on server
    }
    
    if (!this.locationData?.coordinates) {
      console.warn('Location coordinates not available');
      return;
    }

    const mapContainer = document.getElementById('desktop-footer-leaflet-map');
    if (!mapContainer) {
      console.warn('Map container not found');
      return;
    }

    // Clean up existing map if it exists
    if (this.leafletMap) {
      this.leafletMap.remove();
      this.leafletMap = null;
      this.leafletMarker = null;
    }

         // Check if map already exists on the container and clean it up properly
     if ((mapContainer as any)._leaflet_id) {
       console.log('Map already initialized on container, cleaning up...');
       try {
         // Try to get the existing map instance and remove it properly
         const existingMap = (mapContainer as any)._leaflet_id;
         if (existingMap && typeof existingMap === 'object' && existingMap.remove) {
           existingMap.remove();
         }
         // Clear the container's leaflet reference
         (mapContainer as any)._leaflet_id = null;
       } catch (error) {
         console.warn('Error cleaning up existing map:', error);
         // Force clear the container
         (mapContainer as any)._leaflet_id = null;
       }
     }

         // Lazy-load Leaflet with better error handling
     import('leaflet').then((L) => {
       this.leafletLib = L;
       
       // Double-check container is still available and clean
       if (!mapContainer || (mapContainer as any)._leaflet_id) {
         console.warn('Container not available or still has leaflet instance, aborting initialization');
         return;
       }
      
      // Configure default icon paths
      const iconBase = 'https://unpkg.com/leaflet@1.9.4/dist/images/';
      this.leafletLib.Icon.Default.mergeOptions({
        iconUrl: iconBase + 'marker-icon.png',
        iconRetinaUrl: iconBase + 'marker-icon-2x.png',
        shadowUrl: iconBase + 'marker-shadow.png',
      });

      const { lat, lng } = this.locationData.coordinates;
      
      // Create map
      const map = this.leafletLib.map('desktop-footer-leaflet-map', {
        center: [lat, lng],
        zoom: 12,
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        dragging: false,
        touchZoom: false,
        boxZoom: false,
        keyboard: false
      });

      // Add tile layer
      this.leafletLib.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '©OpenStreetMap, ©CartoDB',
        subdomains: 'abcd',
        maxZoom: 19
      }).addTo(map);

      // Create custom marker icon
      const customIcon = this.leafletLib.divIcon({
        className: 'custom-marker',
        html: '<div style="background-color: var(--primary-color); width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>',
        iconSize: [20, 20],
        iconAnchor: [10, 10]
      });

      // Add marker
      const marker = this.leafletLib.marker([lat, lng], { icon: customIcon }).addTo(map);
      
             // Create popup content
       const popupContent = `
         <div style="text-align: center; font-family: Arial, sans-serif; font-size: 10px; line-height: 1.2;">
           <strong style="font-size: 11px;">${this.locationData.title}</strong><br>
           <small style="font-size: 9px;">${this.locationData.address}</small>
         </div>
       `;

       // Bind popup to marker
       marker.bindPopup(popupContent, { 
         autoPan: true, 
         maxWidth: 120, 
         className: 'footer-map-popup' 
       }).openPopup();

             // Store references
       this.leafletMap = map;
       this.leafletMarker = marker;

       // Ensure proper sizing after initialization
       setTimeout(() => {
         if (this.leafletMap) {
           this.leafletMap.invalidateSize();
         }
       }, 100);

     }).catch((error) => {
       console.error('Failed to load Leaflet for desktop footer:', error);
     });
   }

  /**
   * Refresh the leaflet map content (marker + popup) when language changes
   */
  private refreshLeafletMap(): void {
    // Check if running in browser first
    if (!isPlatformBrowser(this.platformId)) {
      return; // Don't refresh map on server
    }
    
    // If map doesn't exist, reinitialize it
    if (!this.leafletMap || !this.leafletLib || !this.locationData?.coordinates) {
      console.log('Map not available, reinitializing...');
      setTimeout(() => this.initializeMap(), 200);
      return;
    }

    const L = this.leafletLib;
    const { lat, lng } = this.locationData.coordinates;

    // Update map view
    this.leafletMap.setView([lat, lng], 12, { animate: false });
    
    // Remove old marker and add new one
    if (this.leafletMarker) {
      this.leafletMap.removeLayer(this.leafletMarker);
    }

    // Create custom marker icon
    const customIcon = L.divIcon({
      className: 'custom-marker',
      html: '<div style="background-color: var(--primary-color); width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>',
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });

    // Add new marker
    this.leafletMarker = L.marker([lat, lng], { icon: customIcon }).addTo(this.leafletMap);
    
         // Create popup content
     const popupContent = `
       <div style="text-align: center; font-family: Arial, sans-serif; font-size: 10px; line-height: 1.2;">
         <strong style="font-size: 11px;">${this.locationData.title}</strong><br>
         <small style="font-size: 9px;">${this.locationData.address}</small>
       </div>
     `;

     // Bind popup to marker
     this.leafletMarker.bindPopup(popupContent, { 
       autoPan: true, 
       maxWidth: 120, 
       className: 'footer-map-popup' 
     }).openPopup();

    // Invalidate size to ensure proper rendering
    setTimeout(() => this.leafletMap && this.leafletMap.invalidateSize(), 0);
  }
}
