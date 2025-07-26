const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Use env var for JWT_SECRET
const JWT_SECRET = process.env.JWT_SECRET || 'secret'

const users = [] // For now, using in-memory storage. Replace with DB later

exports.signupUser = async (req, res) => {
    const { email, password, name } = req.body

    // Validate required fields
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Name, email, and password are required' })
    }

    const existingUser = users.find(u => u.email === email)
    if (existingUser) return res.status(400).json({ message: 'User already exists' })

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = { 
        id: Date.now().toString(),
        name,
        email, 
        password: hashedPassword 
    }
    users.push(user)

    // Create token with user data
    const token = jwt.sign(
        { 
            id: user.id,
            email: user.email,
            name: user.name 
        }, 
        JWT_SECRET, 
        { expiresIn: '1h' }
    )
    
    // Return user data (excluding password) and token
    const { password: _, ...userWithoutPassword } = user
    res.status(201).json({ 
        message: 'User created successfully', 
        token,
        user: userWithoutPassword
    })
}

exports.signinUser = async (req, res) => {
  const { email, password } = req.body

  const user = users.find(u => u.email === email)
  if (!user) return res.status(404).json({ message: 'User not found' })

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' })

  // Create token with user data
  const token = jwt.sign(
    { 
      id: user.id,
      email: user.email,
      name: user.name 
    }, 
    JWT_SECRET, 
    { expiresIn: '1h' }
  )
  
  // Return user data (excluding password) and token
  const { password: _, ...userWithoutPassword } = user
  res.json({ 
    token,
    user: userWithoutPassword
  })
}
