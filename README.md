# ![DevView](./dev-view-thumbnail.png)

# DevView

DevView is a remote interview platform designed specifically for interviewing developers. It provides a seamless experience for both **Interviewers** and **Candidates**, enabling instant meetings, scheduled interviews, coding challenges, and interview recordings. With an intuitive and interactive UI, DevView enhances the technical interview process with video calls, a collaborative code editor, and an advanced scheduling system.

## 🌐 Live Site: https://dev-view.vercel.app/

## 🚀 Features

### 🎯 **For Interviewers**

- **Instant Meeting** - Start a new interview instantly.
- **Join Interview** - Join an existing interview using a shared link.
- **Schedule Interviews** - Set up interviews with candidates at a specific date and time.
- **Recording Management** - View and share past interview recordings.
- **Dashboard** - Organize interviews into:
  - Upcoming
  - Completed
  - Succeeded
  - Failed
- **Interview Evaluation** - Mark interviews as Succeeded/Failed, add ratings, and leave comments.

### 🧑‍💻 **For Candidates**

- **Instant Meeting** - Join a technical interview immediately.
- **Join Interview** - Enter an interview by pasting a shared link.
- **Scheduled Interviews** - View upcoming interviews.

### 📹 **Meeting Features**

- **Pre-join Device Check** - Configure camera, mic, and other settings before entering.
- **Video Call** powered by **Stream SDK** with:
  - Toggle camera/microphone
  - Device selection
  - Reactions & screen sharing
  - Virtual background & noise cancellation
  - Participant list & layout selection
- **Coding Interface** with:
  - **Coding Questions Panel** - Select language and coding problems.
  - **Browser-based Code Editor** - Built using **Monaco Editor**

---

## 🛠️ Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Authentication**: Clerk
- **Real-time Communication**: Stream SDK (Video & Audio)
- **Database & Backend**: Convex
- **Code Editor**: Monaco Editor
- **UI Components**: Shadcn

---

## 🔧 Installation & Setup

### **1️⃣ Clone the Repository**

```sh
git clone https://github.com/the-nazzmul/dev-view
cd dev-view
```

### **2️⃣ Install Dependencies**

```sh
npm install
# or
yarn install
```

### **3️⃣ Set Up Environment Variables**

Create a `.env.local` file in the root directory and add the following:

```sh
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
CLERK_SECRET_KEY=your-clerk-secret-key
CLERK_WEBHOOK_SECRET=your-clerk-webhook-secret

# Convex Backend
CONVEX_DEPLOYMENT=your-convex-deployment
NEXT_PUBLIC_CONVEX_URL=your-convex-url

# Stream API
NEXT_PUBLIC_STREAM_API_KEY=your-stream-api-key
SECRET_SECRET_KEY=your-stream-secret-key
```

Replace the values with your actual keys.

### **4️⃣ Run the Application**

```sh
npm run dev
# or
yarn dev
```

This will start the development server on `http://localhost:3000`.

---

## 📁 Project Structure

## 🔗 API & Services Used

- **[Clerk](https://clerk.com/)** – Authentication
- **[Stream Video SDK](https://getstream.io/)** – Video & Audio Calls
- **[Convex](https://convex.dev/)** – Backend & Database
- **[Monaco Editor](https://www.npmjs.com/package/@monaco-editor/react)** – Code Editor
- **[Shadcn](https://ui.shadcn.com/)** – UI Components

---

## 📬 Contact

For support or feedback, reach out at:

- **Email**: nazmul.hussain.utchash@gmail.com
- **GitHub**: [yourusername](https://github.com/the-nazzmul)
