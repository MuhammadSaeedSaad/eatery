module.exports = async function (app) {
  const Role = app.models.Role;
  const Customer = app.models.Customer;
  const Chef = app.models.Chef;
  const RoleMapping = app.models.RoleMapping;
  let chefRole;
  let customerRole;

  //   const Roles = await Role.find();
  //   if (Roles.length === 0) {
  //     customerRole = await Role.create({ name: "customer" });
  //     chefRole = await Role.create({ name: "chef" });
  //   } else {

  //   }

  try {
    customerRole = await Role.findOrCreate({where: { name: "customer" }}, { name: "customer" });
    console.log(customerRole);
  } catch (error) {
    console.log(error);
  }

  try {
    chefRole = await Role.findOrCreate({where: { name: "chef" }}, { name: "chef" });
    console.log(chefRole);
  } catch (error) {
    console.log(error);
  }

  Customer.afterRemote("create", function (context, user, next) {
    customerRole[0].principals.create({
      principalType: RoleMapping.USER,
      principalId: user.id,
    });
    next();
  });

  Chef.afterRemote("create", function (context, user, next) {
    chefRole[0].principals.create({
      principalType: RoleMapping.USER,
      principalId: user.id,
    });
    next();
  });
};
