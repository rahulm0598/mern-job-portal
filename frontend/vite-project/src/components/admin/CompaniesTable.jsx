import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSelector } from "react-redux";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const CompaniesTable = () => {
  const { companies } = useSelector((store) => store.company);
  const navigate = useNavigate();
  return (
    <div className="w-full mx-auto mt-5">
      <div className="w-[80%] mx-auto rounded-md border-2 border-gray-200 p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-base font-semibold">Logo</TableHead>
              <TableHead className="text-base font-semibold">Name</TableHead>
              <TableHead className="text-base font-semibold">
                Location
              </TableHead>
              <TableHead className="text-base font-semibold">
                Description
              </TableHead>
              <TableHead className="text-base font-semibold">website</TableHead>
              <TableHead className="text-base font-semibold">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companies.map((company) => (
              <TableRow key={company._id}>
                <TableCell className="text-base font-medium">
                  <Avatar>
                    <AvatarImage src={company?.logo} alt="@shadcn" />
                  </Avatar>
                </TableCell>
                <TableCell className="text-base font-medium">
                  {company.name}
                </TableCell>
                <TableCell className="text-base font-medium">
                  {company.location}
                </TableCell>
                <TableCell className="text-base font-medium">
                  {company.description}
                </TableCell>
                <TableCell className="text-base font-medium">
                  {company.website}
                </TableCell>
                <TableCell className="text-base font-medium">
                  <Button
                    onClick={() =>
                      navigate(`/admin/update/company/${company._id}`)
                    }
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
export default CompaniesTable;
