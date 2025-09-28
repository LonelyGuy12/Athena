typedef unsigned char   undefined;

typedef unsigned char    byte;
typedef unsigned int    dword;
typedef long long    longlong;
typedef unsigned long    qword;
typedef unsigned char    uchar;
typedef unsigned int    uint;
typedef unsigned long long    ulonglong;
typedef unsigned char    undefined1;
typedef unsigned long    undefined8;
typedef unsigned short    ushort;
typedef unsigned short    word;
typedef int __int32_t;

typedef __int32_t __darwin_dev_t;

typedef __darwin_dev_t dev_t;

typedef uint __uint32_t;

typedef __uint32_t __darwin_gid_t;

typedef longlong __int64_t;

typedef __int64_t __darwin_off_t;

typedef ulonglong __uint64_t;

typedef __uint32_t __darwin_uid_t;

typedef ushort __uint16_t;

typedef __uint16_t __darwin_mode_t;

typedef __uint64_t __darwin_ino64_t;

typedef long __darwin_time_t;

typedef __int64_t __darwin_blkcnt_t;

typedef __int32_t __darwin_blksize_t;

typedef struct timespec timespec, *Ptimespec;

struct timespec {
    __darwin_time_t tv_sec;
    long tv_nsec;
};

typedef __darwin_uid_t uid_t;

typedef __uint16_t nlink_t;

typedef struct stat stat, *Pstat;

typedef __darwin_mode_t mode_t;

typedef __darwin_gid_t gid_t;

typedef __darwin_off_t off_t;

typedef __darwin_blkcnt_t blkcnt_t;

typedef __darwin_blksize_t blksize_t;

struct stat {
    dev_t st_dev;
    mode_t st_mode;
    nlink_t st_nlink;
    __darwin_ino64_t st_ino;
    uid_t st_uid;
    gid_t st_gid;
    dev_t st_rdev;
    struct timespec st_atimespec;
    struct timespec st_mtimespec;
    struct timespec st_ctimespec;
    struct timespec st_birthtimespec;
    off_t st_size;
    blkcnt_t st_blocks;
    blksize_t st_blksize;
    __uint32_t st_flags;
    __uint32_t st_gen;
    __int32_t st_lspare;
    __int64_t st_qspare[2];
};

typedef struct __sFILEX __sFILEX, *P__sFILEX;

struct __sFILEX {
};

typedef struct __sbuf __sbuf, *P__sbuf;

struct __sbuf {
    uchar *_base;
    int _size;
};

typedef struct __sFILE __sFILE, *P__sFILE;

typedef __darwin_off_t fpos_t;

typedef struct __sFILE FILE;

struct __sFILE {
    uchar *_p;
    int _r;
    int _w;
    short _flags;
    short _file;
    struct __sbuf _bf;
    int _lbfsize;
    void *_cookie;
    int (*_close)(void *);
    int (*_read)(void *, char *, int);
    fpos_t (*_seek)(void *, fpos_t, int);
    int (*_write)(void *, char *, int);
    struct __sbuf _ub;
    struct __sFILEX *_extra;
    int _ur;
    uchar _ubuf[3];
    uchar _nbuf[1];
    struct __sbuf _lb;
    int _blksize;
    fpos_t _offset;
};

typedef struct CS_CodeDirectory CS_CodeDirectory, *PCS_CodeDirectory;

struct CS_CodeDirectory {
    dword magic; // magic number (CSMAGIC_CODEDIRECTORY)
    dword length; // total length of CodeDirectory blob
    dword version; // compatibility version
    dword flags; // setup and mode flags
    dword hashOffset; // offset of hash slot element at index zero
    dword identOffset; // offset of identifier string
    dword nSpecialSlots; // number of special hash slots
    dword nCodeSlots; // number of ordinary (code) hash slots
    dword codeLimit; // limit to main image signature range
    byte hashSize; // size of each hash in bytes
    byte hashType; // type of hash (cdHashType* constants)
    byte platform; // platform identifier; zero if not platform binary
    byte pageSize; // log2(page size in bytes); 0 => infinite
    dword spare2; // unused (must be zero)
    dword scatterOffset; // offset of optional scatter vector
    dword teamOffset; // offset of optional team identifier
    dword spare3; // unused (must be zero)
    qword codeLimit64; // limit to main image signature range, 64 bits
    qword execSegBase; // offset of executable segment
    qword execSegLimit; // limit of executable segment
    qword execSegFlags; // executable segment flags
    dword runtime;
    dword preEncryptOffset;
};

typedef struct uuid_command uuid_command, *Puuid_command;

struct uuid_command {
    dword cmd;
    dword cmdsize;
    byte uuid[16];
};

typedef struct lc_str lc_str, *Plc_str;

struct lc_str {
    dword offset;
};

typedef struct dyld_info_command dyld_info_command, *Pdyld_info_command;

struct dyld_info_command {
    dword cmd;
    dword cmdsize;
    dword rebase_off; // file offset to rebase info
    dword rebase_size; // size of rebase info
    dword bind_off; // file offset to binding info
    dword bind_size; // size of binding info
    dword weak_bind_off; // file offset to weak binding info
    dword weak_bind_size; // size of weak binding info
    dword lazy_bind_off; // file offset to lazy binding info
    dword lazy_bind_size; // size of lazy binding info
    dword export_off; // file offset to lazy binding info
    dword export_size; // size of lazy binding info
};

typedef struct section section, *Psection;

struct section {
    char sectname[16];
    char segname[16];
    qword addr;
    qword size;
    dword offset;
    dword align;
    dword reloff;
    dword nrelocs;
    dword flags;
    dword reserved1;
    dword reserved2;
    dword reserved3;
};

typedef struct dylinker_command dylinker_command, *Pdylinker_command;

struct dylinker_command {
    dword cmd;
    dword cmdsize;
    struct lc_str name;
};

typedef struct rpath_command rpath_command, *Prpath_command;

struct rpath_command {
    dword cmd;
    dword cmdsize;
    struct lc_str path;
};

typedef enum bind_opcode {
    BIND_OPCODE_DONE=0,
    BIND_OPCODE_SET_DYLIB_ORDINAL_IMM=16,
    BIND_OPCODE_SET_DYLIB_ORDINAL_ULEB=32,
    BIND_OPCODE_SET_DYLIB_SPECIAL_IMM=48,
    BIND_OPCODE_SET_SYMBOL_TRAILING_FLAGS_IMM=64,
    BIND_OPCODE_SET_TYPE_IMM=80,
    BIND_OPCODE_SET_ADDEND_SLEB=96,
    BIND_OPCODE_SET_SEGMENT_AND_OFFSET_ULEB=112,
    BIND_OPCODE_ADD_ADDR_ULEB=128,
    BIND_OPCODE_DO_BIND=144,
    BIND_OPCODE_DO_BIND_ADD_ADDR_ULEB=160,
    BIND_OPCODE_DO_BIND_ADD_ADDR_IMM_SCALED=176,
    BIND_OPCODE_DO_BIND_ULEB_TIMES_SKIPPING_ULEB=192,
    BIND_OPCODE_THREADED=208
} bind_opcode;

typedef struct linkedit_data_command linkedit_data_command, *Plinkedit_data_command;

struct linkedit_data_command {
    dword cmd;
    dword cmdsize;
    dword dataoff;
    dword datasize;
};

typedef struct CS_BlobIndex CS_BlobIndex, *PCS_BlobIndex;

struct CS_BlobIndex {
    dword type; // type of entry
    dword offset; // offset of entry
};

typedef struct entry_point_command entry_point_command, *Pentry_point_command;

struct entry_point_command {
    dword cmd;
    dword cmdsize;
    qword entryoff;
    qword stacksize;
};

typedef struct nlist nlist, *Pnlist;

struct nlist {
    dword n_strx;
    byte n_type;
    byte n_sect;
    word n_desc;
    qword n_value;
};

typedef struct segment_command segment_command, *Psegment_command;

struct segment_command {
    dword cmd;
    dword cmdsize;
    char segname[16];
    qword vmaddr;
    qword vmsize;
    qword fileoff;
    qword filesize;
    dword maxprot;
    dword initprot;
    dword nsects;
    dword flags;
};

typedef struct mach_header mach_header, *Pmach_header;

struct mach_header {
    dword magic;
    dword cputype;
    dword cpusubtype;
    dword filetype;
    dword ncmds;
    dword sizeofcmds;
    dword flags;
    dword reserved;
};

typedef struct build_tool_version build_tool_version, *Pbuild_tool_version;

struct build_tool_version {
    dword tool;
    dword version;
};

typedef struct build_version_command build_version_command, *Pbuild_version_command;

struct build_version_command {
    dword cmd;
    dword cmdsize;
    dword platform;
    dword minos;
    dword sdk;
    dword ntools;
    struct build_tool_version build_tool_version[][1];
};

typedef struct dylib dylib, *Pdylib;

struct dylib {
    struct lc_str name;
    dword timestamp;
    dword current_version;
    dword compatibility_version;
};

typedef struct dysymtab_command dysymtab_command, *Pdysymtab_command;

struct dysymtab_command {
    dword cmd;
    dword cmdsize;
    dword ilocalsym;
    dword nlocalsym;
    dword iextdefsym;
    dword nextdefsym;
    dword iundefsym;
    dword nundefsym;
    dword tocoff;
    dword ntoc;
    dword modtaboff;
    dword nmodtab;
    dword extrefsymoff;
    dword nextrefsyms;
    dword indirectsymoff;
    dword nindirectsyms;
    dword extreloff;
    dword nextrel;
    dword locreloff;
    dword nlocrel;
};

typedef struct CS_SuperBlob CS_SuperBlob, *PCS_SuperBlob;

struct CS_SuperBlob {
    dword magic; // magic number
    dword length; // total length of SuperBlob
    dword count; // number of index entries following
    struct CS_BlobIndex index[5]; // (count) entries
};

typedef struct dylib_command dylib_command, *Pdylib_command;

struct dylib_command {
    dword cmd;
    dword cmdsize;
    struct dylib dylib;
};

typedef struct symtab_command symtab_command, *Psymtab_command;

struct symtab_command {
    dword cmd;
    dword cmdsize;
    dword symoff;
    dword nsyms;
    dword stroff;
    dword strsize;
};

typedef struct CS_GenericBlob CS_GenericBlob, *PCS_GenericBlob;

struct CS_GenericBlob {
    dword magic; // magic number
    dword length; // total length of blob
};

typedef enum rebase_opcode {
    REBASE_OPCODE_DONE=0,
    REBASE_OPCODE_SET_TYPE_IMM=16,
    REBASE_OPCODE_SET_SEGMENT_AND_OFFSET_ULEB=32,
    REBASE_OPCODE_ADD_ADDR_ULEB=48,
    REBASE_OPCODE_ADD_ADDR_IMM_SCALED=64,
    REBASE_OPCODE_DO_REBASE_IMM_TIMES=80,
    REBASE_OPCODE_DO_REBASE_ULEB_TIMES=96,
    REBASE_OPCODE_DO_REBASE_ADD_ADDR_ULEB=112,
    REBASE_OPCODE_DO_REBASE_ULEB_TIMES_SKIPPING_ULEB=128
} rebase_opcode;



undefined *PTR____stdoutp_100004010;
undefined *PTR____stderrp_100004008;
undefined *PTR____stdinp_100004000;
undefined *PTR__ElectronInitializeICUandStartNode_100008000;
undefined *PTR__getenv_100008008;
undefined *PTR__ElectronMain_100008010;
undefined *PTR_IsRunAsNodeEnabled_100008018;
undefined *PTR__freopen_100008020;
undefined *PTR____error_100008028;
undefined *PTR__fstat_100008030;

void entry(undefined8 param_1,undefined8 param_2)

{
  int iVar1;
  char *pcVar2;
  
  FUN_100000608();
  iVar1 = electron::fuses::IsRunAsNodeEnabled();
  if (((iVar1 != 0) && (pcVar2 = _getenv("ELECTRON_RUN_AS_NODE"), pcVar2 != (char *)0x0)) &&
     (*pcVar2 != '\0')) {
    _ElectronInitializeICUandStartNode(param_1,param_2);
    return;
  }
  _ElectronMain(param_1,param_2);
  return;
}



void FUN_100000608(void)

{
  int iVar1;
  int *piVar2;
  stat local_a0;
  
  local_a0.st_gen = 0xaaaaaaaa;
  local_a0.st_lspare = -0x55555556;
  local_a0.st_blksize = -0x55555556;
  local_a0.st_flags = 0xaaaaaaaa;
  local_a0.st_qspare[1] = -0x5555555555555556;
  local_a0.st_qspare[0] = -0x5555555555555556;
  local_a0.st_birthtimespec.tv_nsec = -0x5555555555555556;
  local_a0.st_birthtimespec.tv_sec = -0x5555555555555556;
  local_a0.st_blocks = -0x5555555555555556;
  local_a0.st_size = -0x5555555555555556;
  local_a0.st_mtimespec.tv_nsec = -0x5555555555555556;
  local_a0.st_mtimespec.tv_sec = -0x5555555555555556;
  local_a0.st_ctimespec.tv_nsec = -0x5555555555555556;
  local_a0.st_ctimespec.tv_sec = -0x5555555555555556;
  local_a0.st_rdev = -0x55555556;
  local_a0._28_4_ = 0xaaaaaaaa;
  local_a0.st_uid = 0xaaaaaaaa;
  local_a0.st_gid = 0xaaaaaaaa;
  local_a0.st_atimespec.tv_nsec = -0x5555555555555556;
  local_a0.st_atimespec.tv_sec = -0x5555555555555556;
  local_a0.st_ino = 0xaaaaaaaaaaaaaaaa;
  local_a0.st_dev = -0x55555556;
  local_a0.st_mode = 0xaaaa;
  local_a0.st_nlink = 0xaaaa;
  iVar1 = _fstat(0,&local_a0);
  if ((iVar1 < 0) && (piVar2 = ___error(), *piVar2 == 9)) {
    _freopen("/dev/null","r",*(FILE **)PTR____stdinp_100004000);
  }
  iVar1 = _fstat(1,&local_a0);
  if ((iVar1 < 0) && (piVar2 = ___error(), *piVar2 == 9)) {
    _freopen("/dev/null","w",*(FILE **)PTR____stdoutp_100004010);
  }
  iVar1 = _fstat(2,&local_a0);
  if ((iVar1 < 0) && (piVar2 = ___error(), *piVar2 == 9)) {
    _freopen("/dev/null","w",*(FILE **)PTR____stderrp_100004008);
  }
  return;
}



void _ElectronInitializeICUandStartNode(void)

{
                    // WARNING: Could not recover jumptable at 0x00010000070c. Too many branches
                    // WARNING: Treating indirect jump as call
  (*(code *)PTR__ElectronInitializeICUandStartNode_100008000)();
  return;
}



// WARNING: Unknown calling convention -- yet parameter storage is locked

char * _getenv(char *param_1)

{
  char *pcVar1;
  
                    // WARNING: Could not recover jumptable at 0x000100000718. Too many branches
                    // WARNING: Treating indirect jump as call
  pcVar1 = (char *)(*(code *)PTR__getenv_100008008)();
  return pcVar1;
}



void _ElectronMain(void)

{
                    // WARNING: Could not recover jumptable at 0x000100000724. Too many branches
                    // WARNING: Treating indirect jump as call
  (*(code *)PTR__ElectronMain_100008010)();
  return;
}



// WARNING: Unknown calling convention -- yet parameter storage is locked
// electron::fuses::IsRunAsNodeEnabled()

void electron::fuses::IsRunAsNodeEnabled(void)

{
                    // WARNING: Could not recover jumptable at 0x000100000730. Too many branches
                    // WARNING: Treating indirect jump as call
  (*(code *)PTR_IsRunAsNodeEnabled_100008018)();
  return;
}



// WARNING: Unknown calling convention -- yet parameter storage is locked

FILE * _freopen(char *param_1,char *param_2,FILE *param_3)

{
  FILE *pFVar1;
  
                    // WARNING: Could not recover jumptable at 0x00010000073c. Too many branches
                    // WARNING: Treating indirect jump as call
  pFVar1 = (FILE *)(*(code *)PTR__freopen_100008020)();
  return pFVar1;
}



// WARNING: Unknown calling convention -- yet parameter storage is locked

int * ___error(void)

{
  int *piVar1;
  
                    // WARNING: Could not recover jumptable at 0x000100000748. Too many branches
                    // WARNING: Treating indirect jump as call
  piVar1 = (int *)(*(code *)PTR____error_100008028)();
  return piVar1;
}



// WARNING: Unknown calling convention -- yet parameter storage is locked

int _fstat(int param_1,stat *param_2)

{
  int iVar1;
  
                    // WARNING: Could not recover jumptable at 0x000100000754. Too many branches
                    // WARNING: Treating indirect jump as call
  iVar1 = (*(code *)PTR__fstat_100008030)(param_1);
  return iVar1;
}


