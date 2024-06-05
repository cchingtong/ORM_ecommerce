const fs = require('fs');
const path = require('path');

const profilesPath = path.join(__dirname, '../data/profiles.json');

const readProfiles = () => {
  const data = fs.readFileSync(profilesPath, 'utf8');
  return JSON.parse(data);
};

const writeProfiles = (data) => {
  fs.writeFileSync(profilesPath, JSON.stringify(data, null, 2));
};

exports.createProfile = (req, res) => {
  const profiles = readProfiles();
  const newProfile = req.body;
  profiles.push(newProfile);
  writeProfiles(profiles);
  res.status(201).send(newProfile);
};

exports.getProfiles = (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const profiles = readProfiles();
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const resultProfiles = profiles.slice(startIndex, endIndex);
  res.json({
    profiles: resultProfiles,
    totalPages: Math.ceil(profiles.length / limit),
    currentPage: Number(page)
  });
};

exports.searchProfiles = (req, res) => {
  const { first_name, last_name } = req.query;
  const profiles = readProfiles();
  const filteredProfiles = profiles.filter(profile => 
    (first_name && profile.first_name.toLowerCase().includes(first_name.toLowerCase())) ||
    (last_name && profile.last_name.toLowerCase().includes(last_name.toLowerCase()))
  );
  res.send(filteredProfiles);
};

exports.updateProfile = (req, res) => {
  const profiles = readProfiles();
  const index = profiles.findIndex(profile => profile.profile_id === Number(req.params.id));
  if (index !== -1) {
    profiles[index] = { ...profiles[index], ...req.body };
    writeProfiles(profiles);
    res.send(profiles[index]);
  } else {
    res.status(404).send({ error: 'Profile not found' });
  }
};

exports.deleteProfile = (req, res) => {
  const profiles = readProfiles();
  const index = profiles.findIndex(profile => profile.profile_id === Number(req.params.id));
  if (index !== -1) {
    const deletedProfile = profiles.splice(index, 1);
    writeProfiles(profiles);
    res.send(deletedProfile);
  } else {
    res.status(404).send({ error: 'Profile not found' });
  }
};
