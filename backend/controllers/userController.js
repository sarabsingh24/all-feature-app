



export const getUsers = async (req, res) => {

  try {
    res.status(201).json({ message: 'get user.......' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const setUser = async (req, res) => {
  try {
    res.status(201).json({ message: 'set user.......' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    res.status(201).json({ message: 'update user.......' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    res.status(201).json({ message: 'delete user.......' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
