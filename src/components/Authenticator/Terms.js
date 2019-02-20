import * as React from 'react'
import { Button, Checkbox, Classes, Intent, Dialog } from "@blueprintjs/core"
import styled from 'styled-components'

class Terms extends React.Component {

    render() {
        return (
            <Dialog
                icon="info-sign"
                onClose={this.props.onClose}
                title="SAPO Terms of Service"
                isOpen={this.props.isOpen}
            >
                <TermsContainer className={Classes.DIALOG_BODY}>
                    <p>
                        Agreement between User and www.sapopros.com
                    </p>
                    <p>
                        Welcome to www.sapopros.com. The www.sapopros.com website (the "Site") is comprised of
                        various web pages operated by SAPO, LLC. www.sapopros.com is offered to you conditioned
                        on your acceptance without modification of the terms, conditions, and notices contained
                        herein (the "Terms"). Your use of www.sapopros.com constitutes your agreement to all
                        such Terms. Please read these terms carefully, and keep a copy of them for your reference.
                    </p>
                    <p>
                        www.sapopros.com is an E-Commerce Site.
                    </p>
                    <p>
                        SAPO,LLC., provides a simple yet robust and reponsive web application to allow companies or
                        indiviuals that offer pickup or delivery serivices the ability to have their customers
                        schedule online via their website.
                    </p>
                    <p>
                        Privacy
                    </p>
                    <p>
                        Your use of www.sapopros.com is subject to SAPO, LLC's Privacy Policy. Please review our Privacy
                        Policy, which also governs the Site and informs users of our data collection practices.
                    </p>
                    <p>
                        Electronic Communications
                    </p>
                    <p>
                        Visiting www.sapopros.com or sending emails to SAPO, LLC constitutes electronic communications.
                        You consent to receive electronic communications and you agree that all agreements, notices,
                        disclosures and other communications that we provide to you electronically, via email and on the
                        Site, satisfy any legal requirement that such communications be in writing.
                    </p>
                    <p>
                        Your Account
                    </p>
                    <p>
                        If you use this site, you are responsible for maintaining the confidentiality of your account and
                        password and for restricting access to your computer, and you agree to accept responsibility for all
                        activities that occur under your account or password. You may not assign or otherwise transfer your
                        account to any other person or entity. You acknowledge that SAPO, LLC is not responsible for third
                        party access to your account that results from theft or misappropriation of your account. SAPO, LLC
                        and its associates reserve the right to refuse or cancel service, terminate accounts, or remove or edit
                        content in our sole discretion.
                    </p>
                    <p>
                        Children Under Thirteen
                    </p>
                    <p>
                        SAPO, LLC does not knowingly collect, either online or offline, personal information from persons under 
                        the age of thirteen. If you are under 18, you may use www.sapopros.com only with permission of a parent 
                        or guardian.
                    </p>
                    <p>
                        Cancellation/Refund Policy
                    </p>
                    <p>
                        After your trial period, you will automatically be billed monthly. You may cancel your subscription at any time. 
                        You are responsible for the full subscription fee in the monthly billing cycle in which you cancel. Once your account
                        has been billed, all sales are final and there will be no refunds.
                    </p>
                    <p>
                        Links to Third Party Sites/Third Party Services
                    </p>
                    <p>
                        www.sapopros.com may contain links to other websites ("Linked Sites"). The Linked Sites are not under the control of SAPO,
                        LLC and SAPO, LLC is not responsible for the contents of any Linked Site, including without limitation any link contained 
                        in a Linked Site, or any changes or updates to a Linked Site. SAPO, LLC is providing these links to you only as a convenience,
                        and the inclusion of any link does not imply endorsement by SAPO, LLC of the site or any association with its operators.
                    </p>
                    <p>
                        Certain services made available via www.sapopros.com are delivered by third party sites and organizations. By using any product, 
                        service or functionality originating from the www.sapopros.com domain, you hereby acknowledge and consent that SAPO, LLC may share
                        such information and data with any third party with whom SAPO, LLC has a contractual relationship to provide the requested product,
                        service or functionality on behalf of www.sapopros.com users and customers.
                    </p>
                    <p>
                        No Unlawful or Prohibited Use/Intellectual Property
                    </p>
                    <p>
                        You are granted a non-exclusive, non-transferable, revocable license to access and use www.sapopros.com strictly in accordance with 
                        these terms of use. As a condition of your use of the Site, you warrant to SAPO, LLC that you will not use the Site for any purpose 
                        that is unlawful or prohibited by these Terms. You may not use the Site in any manner which could damage, disable, overburden, or impair
                        the Site or interfere with any other party's use and enjoyment of the Site. You may not obtain or attempt to obtain any materials or 
                        information through any means not intentionally made available or provided for through the Site.
                    </p>
                    <p>
                        All content included as part of the Service, such as text, graphics, logos, images, as well as the compilation thereof, and any software used
                        on the Site, is the property of SAPO, LLC or its suppliers and protected by copyright and other laws that protect intellectual property and 
                        proprietary rights. You agree to observe and abide by all copyright and other proprietary notices, legends or other restrictions contained in
                        any such content and will not make any changes thereto.
                    </p>
                    <p>
                        You will not modify, publish, transmit, reverse engineer, participate in the transfer or sale, create derivative works, or in any way exploit any 
                        of the content, in whole or in part, found on the Site. SAPO, LLC content is not for resale. Your use of the Site does not entitle you to make any
                        unauthorized use of any protected content, and in particular you will not delete or alter any proprietary rights or attribution notices in any 
                        content. You will use protected content solely for your personal use, and will make no other use of the content without the express written permission
                        of SAPO, LLC and the copyright owner. You agree that you do not acquire any ownership rights in any protected content. We do not grant you any licenses, 
                        express or implied, to the intellectual property of SAPO, LLC or our licensors except as expressly authorized by these Terms.
                    </p>
                    <p>Use of Communication Services</p>
                    <p>
                        The Site may contain bulletin board services, chat areas, news groups, forums, communities, personal web pages, calendars, and/or other message
                        or communication facilities designed to enable you to communicate with the public at large or with a group (collectively, "Communication Services"). You 
                        agree to use the Communication Services only to post, send and receive messages and material that are proper and related to the particular Communication Service.
                    </p>
                    <p>
                        By way of example, and not as a limitation, you agree that when using a Communication Service, you will not: defame, abuse, harass, stalk, threaten or otherwise 
                        violate the legal rights (such as rights of privacy and publicity) of others; publish, post, upload, distribute or disseminate any inappropriate, profane, defamatory,
                        infringing, obscene, indecent or unlawful topic, name, material or information; upload files that contain software or other material protected by intellectual 
                        property laws (or by rights of privacy of publicity) unless you own or control the rights thereto or have received all necessary consents; upload files that contain
                        viruses, corrupted files, or any other similar software or programs that may damage the operation of another's computer; advertise or offer to sell or buy any goods
                        or services for any business purpose, unless such Communication Service specifically allows such messages; conduct or forward surveys, contests, pyramid schemes or 
                        chain letters; download any file posted by another user of a Communication Service that you know, or reasonably should know, cannot be legally distributed in such manner;
                        falsify or delete any author attributions, legal or other proper notices or proprietary designations or labels of the origin or source of software or other material 
                        contained in a file that is uploaded; restrict or inhibit any other user from using and enjoying the Communication Services; violate any code of conduct or other 
                        guidelines which may be applicable for any particular Communication Service; harvest or otherwise collect information about others, including e-mail addresses, 
                        without their consent; violate any applicable laws or regulations.
                    </p>
                    <p>
                        SAPO, LLC has no obligation to monitor the Communication Services. However, SAPO, LLC reserves the right to review materials posted to a Communication Service and
                        to remove any materials in its sole discretion. SAPO, LLC reserves the right to terminate your access to any or all of the Communication Services at any time without
                        notice for any reason whatsoever.
                    </p>
                    <p>
                        SAPO, LLC reserves the right at all times to disclose any information as necessary to satisfy any applicable law, regulation, legal process or governmental request, 
                        or to edit, refuse to post or to remove any information or materials, in whole or in part, in SAPO, LLC's sole discretion.
                    </p>
                    <p>
                        Always use caution when giving out any personally identifying information about yourself or your children in any Communication Service. SAPO, LLC does not control or 
                        endorse the content, messages or information found in any Communication Service and, therefore, SAPO, LLC specifically disclaims any liability with regard to the Communication
                        Services and any actions resulting from your participation in any Communication Service. Managers and hosts are not authorized SAPO, LLC spokespersons, and their views do not
                        necessarily reflect those of SAPO, LLC.
                    </p>
                    <p>
                        Materials uploaded to a Communication Service may be subject to posted limitations on usage, reproduction and/or dissemination. You are responsible for adhering to such limitations
                        if you upload the materials.
                    </p>
                    <p>Materials Provided to www.sapopros.com or Posted on Any SAPO, LLC Web Page</p>
                    <p>
                        SAPO, LLC does not claim ownership of the materials you provide to www.sapopros.com (including feedback and suggestions) or post, upload, input or submit to any SAPO, LLC Site or
                        our associated services (collectively "Submissions"). However, by posting, uploading, inputting, providing or submitting your Submission you are granting SAPO, LLC, our affiliated 
                        companies and necessary sublicensees permission to use your Submission in connection with the operation of their Internet businesses including, without limitation, the rights to: 
                        copy, distribute, transmit, publicly display, publicly perform, reproduce, edit, translate and reformat your Submission; and to publish your name in connection with your Submission.
                    </p>
                    <p>
                        No compensation will be paid with respect to the use of your Submission, as provided herein. SAPO, LLC is under no obligation to post or use any Submission you may provide and may remove
                        any Submission at any time in SAPO, LLC's sole discretion.
                    </p>
                    <p>
                        By posting, uploading, inputting, providing or submitting your Submission you warrant and represent that you own or otherwise control all of the rights to your Submission as described in
                        this section including, without limitation, all the rights necessary for you to provide, post, upload, input or submit the Submissions.
                    </p>
                    <p>
                        Third Party Accounts
                    </p>
                    <p>
                        You will be able to connect your SAPO, LLC account to third party accounts. By connecting your SAPO, LLC account to your third party account, you acknowledge and agree that you are consenting
                        to the continuous release of information about you to others (in accordance with your privacy settings on those third party sites). If you do not want information about you to be shared in this
                        manner, do not use this feature.
                    </p>
                    <p>
                        International Users
                    </p>
                    <p>
                        The Service is controlled, operated and administered by SAPO, LLC from our offices within the USA. If you access the Service from a location outside the USA, you are responsible for compliance with
                        all local laws. You agree that you will not use the SAPO, LLC Content accessed through www.sapopros.com in any country or in any manner prohibited by any applicable laws, restrictions or regulations.
                    </p>
                    <p>Indemnification</p>
                    <p>
                        You agree to indemnify, defend and hold harmless SAPO, LLC, its officers, directors, employees, agents and third parties, for any losses, costs, liabilities and expenses (including reasonable 
                        attorney's fees) relating to or arising out of your use of or inability to use the Site or services, any user postings made by you, your violation of any terms of this Agreement or your violation of 
                        any rights of a third party, or your violation of any applicable laws, rules or regulations. SAPO, LLC reserves the right, at its own cost, to assume the exclusive defense and control of any matter
                        otherwise subject to indemnification by you, in which event you will fully cooperate with SAPO, LLC in asserting any available defenses.
                    </p>
                    <p>Class Action Waiver</p> 
                    <p>
                        Any arbitration under these Terms and Conditions will take place on an individual basis; class arbitrations and class/representative/collective actions are not permitted. THE PARTIES AGREE THAT A PARTY
                        MAY BRING CLAIMS AGAINST THE OTHER ONLY IN EACH'S INDIVIDUAL CAPACITY, AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PUTATIVE CLASS, COLLECTIVE AND/ OR REPRESENTATIVE PROCEEDING, SUCH AS IN THE FORM OF
                        A PRIVATE ATTORNEY GENERAL ACTION AGAINST THE OTHER. Further, unless both you and SAPO, LLC agree otherwise, the arbitrator may not consolidate more than one person's claims, and may not otherwise preside
                        over any form of a representative or class proceeding.
                    </p>
                    <p>Liability Disclaimer</p>
                    <p>
                        THE INFORMATION, SOFTWARE, PRODUCTS, AND SERVICES INCLUDED IN OR AVAILABLE THROUGH THE SITE MAY INCLUDE INACCURACIES OR TYPOGRAPHICAL ERRORS. CHANGES ARE PERIODICALLY ADDED TO THE INFORMATION HEREIN.
                        SAPO, LLC AND/OR ITS SUPPLIERS MAY MAKE IMPROVEMENTS AND/OR CHANGES IN THE SITE AT ANY TIME.
                    </p>
                    <p>
                        SAPO, LLC AND/OR ITS SUPPLIERS MAKE NO REPRESENTATIONS ABOUT THE SUITABILITY, RELIABILITY, AVAILABILITY, TIMELINESS, AND ACCURACY OF THE INFORMATION, SOFTWARE, PRODUCTS, SERVICES AND RELATED GRAPHICS 
                        CONTAINED ON THE SITE FOR ANY PURPOSE. TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, ALL SUCH INFORMATION, SOFTWARE, PRODUCTS, SERVICES AND RELATED GRAPHICS ARE PROVIDED "AS IS" WITHOUT WARRANTY
                        OR CONDITION OF ANY KIND. SAPO, LLC AND/OR ITS SUPPLIERS HEREBY DISCLAIM ALL WARRANTIES AND CONDITIONS WITH REGARD TO THIS INFORMATION, SOFTWARE, PRODUCTS, SERVICES AND RELATED GRAPHICS, INCLUDING ALL
                        IMPLIED WARRANTIES OR CONDITIONS OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE AND NON-INFRINGEMENT.
                    </p>
                    <p>
                        TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL SAPO, LLC AND/OR ITS SUPPLIERS BE LIABLE FOR ANY DIRECT, INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL, CONSEQUENTIAL DAMAGES OR ANY DAMAGES
                        WHATSOEVER INCLUDING, WITHOUT LIMITATION, DAMAGES FOR LOSS OF USE, DATA OR PROFITS, ARISING OUT OF OR IN ANY WAY CONNECTED WITH THE USE OR PERFORMANCE OF THE SITE, WITH THE DELAY OR INABILITY TO USE THE
                        SITE OR RELATED SERVICES, THE PROVISION OF OR FAILURE TO PROVIDE SERVICES, OR FOR ANY INFORMATION, SOFTWARE, PRODUCTS, SERVICES AND RELATED GRAPHICS OBTAINED THROUGH THE SITE, OR OTHERWISE ARISING OUT OF
                        THE USE OF THE SITE, WHETHER BASED ON CONTRACT, TORT, NEGLIGENCE, STRICT LIABILITY OR OTHERWISE, EVEN IF SAPO, LLC OR ANY OF ITS SUPPLIERS HAS BEEN ADVISED OF THE POSSIBILITY OF DAMAGES. BECAUSE SOME 
                        STATES/JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF LIABILITY FOR CONSEQUENTIAL OR INCIDENTAL DAMAGES, THE ABOVE LIMITATION MAY NOT APPLY TO YOU. IF YOU ARE DISSATISFIED WITH ANY PORTION OF 
                        THE SITE, OR WITH ANY OF THESE TERMS OF USE, YOUR SOLE AND EXCLUSIVE REMEDY IS TO DISCONTINUE USING THE SITE.
                    </p>
                    <p>Termination/Access Restriction</p>
                    <p>
                        SAPO, LLC reserves the right, in its sole discretion, to terminate your access to the Site and the related services or any portion thereof at any time, without notice. To the maximum extent permitted by law,
                        this agreement is governed by the laws of the State of North Carolina and you hereby consent to the exclusive jurisdiction and venue of courts in North Carolina in all disputes arising out of or relating to 
                        the use of the Site. Use of the Site is unauthorized in any jurisdiction that does not give effect to all provisions of these Terms, including, without limitation, this section.
                    </p>
                    <p>
                        You agree that no joint venture, partnership, employment, or agency relationship exists between you and SAPO, LLC as a result of this agreement or use of the Site. SAPO, LLC's performance of this agreement is
                        subject to existing laws and legal process, and nothing contained in this agreement is in derogation of SAPO, LLC's right to comply with governmental, court and law enforcement requests or requirements relating
                        to your use of the Site or information provided to or gathered by SAPO, LLC with respect to such use. If any part of this agreement is determined to be invalid or unenforceable pursuant to applicable law 
                        including, but not limited to, the warranty disclaimers and liability limitations set forth above, then the invalid or unenforceable provision will be deemed superseded by a valid, enforceable provision that 
                        most closely matches the intent of the original provision and the remainder of the agreement shall continue in effect.
                    </p>
                    <p>
                        Unless otherwise specified herein, this agreement constitutes the entire agreement between the user and SAPO, LLC with respect to the Site and it supersedes all prior or contemporaneous communications and proposals,
                        whether electronic, oral or written, between the user and SAPO, LLC with respect to the Site. A printed version of this agreement and of any notice given in electronic form shall be admissible in judicial or 
                        administrative proceedings based upon or relating to this agreement to the same extent and subject to the same conditions as other business documents and records originally generated and maintained in printed form.
                        It is the express wish to the parties that this agreement and all related documents be written in English.
                    </p>
                    <p>Changes to Terms</p>
                    <p>
                        SAPO, LLC reserves the right, in its sole discretion, to change the Terms under which www.sapopros.com is offered. The most current version of the Terms will supersede all previous versions. SAPO, LLC encourages you
                        to periodically review the Terms to stay informed of our updates.
                    </p>
                    <p>Contact Us</p>
                    <p>SAPO, LLC welcomes your questions or comments regarding the Terms:</p>
                    <p>
                        <div>SAPO, LLC</div>
                        <div>1657 N Market DR</div>
                        <div>Raleigh, North Carolina 27609</div>
                    </p>
                    <p>
                        Email Address:
                        <div>charles@sapopros.com</div>
                    </p>
                    <p>
                        <div>Telephone number:</div>
                        <div>919-332-3155</div>
                    </p>
                    <p>Effective as of January 14, 2019</p> 
                </TermsContainer>
                <div className={Classes.DIALOG_FOOTER}>
                    <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                        <Button onClick={this.props.onClose}>Close</Button>
                    </div>
                </div>
            </Dialog>
        )
    }
}

const TermsContainer = styled.div`
    overflow-y: scroll;
    height: 350px;
`

export default Terms