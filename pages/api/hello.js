// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import DbConnect from "../../util/DbConnect"
import COrg from "../../classes/org"

export default async function handler(req, res) {
  await DbConnect()

  await COrg.Add ( {xxx: 'xxx'} )
  res.status(200).json({ name: 'John Doe' })
}
