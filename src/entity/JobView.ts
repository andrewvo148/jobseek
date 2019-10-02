import { ViewEntity, ViewColumn, Connection } from "typeorm";
import { Job } from "./Job";
import { Company } from "./Company";
import { JobLocation } from "./JobLocation";


@ViewEntity({
    expression: 
    (connection: Connection) => connection.createQueryBuilder()
        .select("job.id", "id")
        .addSelect("job.title", "title")
        .addSelect("job.slug", "slug")
        .addSelect("job.tags", "tags")
        .addSelect("job.salaryMin", "salaryMin")
        .addSelect("job.salaryMax", "salaryMax")
        .addSelect("job.incomeType", "incomeType")
        .addSelect("job.salaryType", "salaryType")
        .addSelect("job.publishedDated", "publishedDated")
        .addSelect("job.description", "description")
        .addSelect("company.name", "companyName")
        .addSelect("company.title", "companyTitle")
        .addSelect("company.topbenefit", "topbenefit")
        .addSelect("company.logo", "logo")
        .from(Job, "job")
        .leftJoin(Company, "company", `"company"."id" = "job"."companyId"`)
        .where("job.isPublished = true")

})
export class JobView {


    @ViewColumn()
    id: number;

    @ViewColumn()
    title: string;

    @ViewColumn()
    slug: string;

    @ViewColumn()
    description: string;

    @ViewColumn()
    companyName: string;

    @ViewColumn()
    companyTitle: string;

    @ViewColumn()
    logo: string;

    @ViewColumn()
    tags: string;

    @ViewColumn()
    publishedDated: Date;





}