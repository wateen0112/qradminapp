export interface contactsDto {
  id: string;
  title: string;
  content: string;
  senderName: string;
  senderEmail: string;
  senderPhoneNumber: string;
  sendDate: string;
  isReplied: boolean;
}
export interface enterpriseSalesRequestDto {
  id: string;
  isReplied: boolean;
  senderName: string;
  senderPhoneNumber: string;
  sendDate: string;
}
export interface enterprisrDetailsDto {
  id: string;
  companyName: string;
  name: string;
  email: string;
  phoneNumber: string;
  qrCount: string;
  qrType: string;
  description: string;
  isReplied: boolean;
  reply: string;
  industryId: string;
}
export interface GetContactUsDto {
  contactsUs: contactsDto[];
  enterpriseSalesRequest: enterpriseSalesRequestDto[];
}
export interface ReplyContatUsDto {
  id: string;
  reply: string;
}
export interface ReplyEnterpriseDto {
  id: string;
  reply: string;
}
export interface DeleteContactDto {
  id: string;
}
