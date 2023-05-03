export enum ContactUsController {
  Get_All_Contact = "Dashboard/ContactUs/GetAll",
  Get_Details_Contact = `Dashboard/ContactUs/GetById?id=`,
  Get_Details_Enterprise = `Dashboard/ContactUs/GetByIdEnterpriseSalesRequest?id=`,
  Reply_Contact = "Dashboard/ContactUs/Reply",
  Reply_Contact_Enterprise = "Dashboard/ContactUs/ReplyEnterpriseSalesRequest",
  Delete_Contact = "Dashboard/ContactUs/Delete",
  Delete_Contact_Enterprise = "Dashboard/ContactUs/DeleteEnterpriseSalesRequest",
}
